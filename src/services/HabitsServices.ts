import { supabase } from "./supabase/config";
import type { Habit } from "../types/HabitsTypes";

type HabitRow = {
    id: number;
    title: string;
    category_id: number;
    icon: string;
    days: string[] | null;
};

type HabitProgressRow = {
    habit_id: number;
    date: string;
};

const CATEGORY_MAP: Record<string, number> = {
    'study': 1,
    'food': 2,
    'sport': 3,
    'health': 4,
    'hobbies': 5,
    'work': 6,
    'home': 7,
    'money': 8,
    'social': 9
};

const REVERSE_CATEGORY_MAP: Record<number, string> = {
    1: '📚 study',
    2: '🥗 food',
    3: '🏃‍♂️ sport',
    4: '💗 health',
    5: '🕹️ hobbies',
    6: '💼 work',
    7: '🏠 home',
    8: '💵 money',
    9: '🤝 social'
};

const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'sport': '#B1F042',
        'study': '#833AFF',
        'social': '#FF69B4',
        'hobbies': '#FFA500',
        'food': '#FF6347',
        'health': '#FF0000',
        'work': '#4682B4',
        'home': '#8B4513',
        'money': '#FFD700'
    };
    return colors[category] || '#FFFFFF';
};

export const createHabit = async (
    userId: number,
    title: string,
    category: string,
    icon: string,
    days: string[]
) => {
    const categoryId = CATEGORY_MAP[category];

    if (!categoryId) {
        throw new Error("Invalid category");
    }

    const { data, error } = await supabase
        .from('habits')
        .insert({
            user_id: userId,
            title: title,
            category_id: categoryId,
            icon: icon,
            days: days
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating habit:", error);
        throw error;
    }

    return data;
};

export const getUserHabits = async (userId: number): Promise<Habit[]> => {
    const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error("Error fetching habits:", error);
        return [];
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

    const { data: progressData, error: progressError } = await supabase
        .from('habit_progress')
        .select('habit_id, date')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .in('habit_id', data.map((h: HabitRow) => h.id));

    if (progressError) {
        console.error("Error fetching progress:", progressError);
    }

    return data.map((habit: HabitRow) => {
        const category = REVERSE_CATEGORY_MAP[habit.category_id] || 'unknown';

        const habitProgress =
            progressData
                ?.filter((p: HabitProgressRow) => p.habit_id === habit.id)
                .map((p: HabitProgressRow) => p.date) || [];

        return {
            id: habit.id,
            title: habit.title,
            category: category,
            color: getCategoryColor(category),
            icon: habit.icon,
            days: habit.days || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            progress: {
                monday: [0, 0, 0, 0],
                tuesday: [0, 0, 0, 0],
                wednesday: [0, 0, 0, 0],
                thursday: [0, 0, 0, 0],
                friday: [0, 0, 0, 0],
                saturday: [0, 0, 0, 0],
                sunday: [0, 0, 0, 0]
            },
            completedDates: habitProgress
        } as unknown as Habit;
    });
};

export const toggleHabitCheck = async (habitId: number, date: string, userId: number) => {
    const { data: existingCheck } = await supabase
        .from('habit_progress')
        .select('id')
        .eq('habit_id', habitId)
        .eq('date', date)
        .maybeSingle();

    const { data: userHabits } = await supabase
        .from('habits')
        .select('id')
        .eq('user_id', userId);

    const userHabitIds = userHabits?.map(h => h.id) || [];

    const { count: completedTodayCount } = await supabase
        .from('habit_progress')
        .select('*', { count: 'exact', head: true })
        .in('habit_id', userHabitIds)
        .eq('date', date);

    if (existingCheck) {
        const { error: deleteError } = await supabase
            .from('habit_progress')
            .delete()
            .eq('id', existingCheck.id);

        if (deleteError) throw deleteError;

        if (completedTodayCount === 1) {
        
            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const { count: completedYesterdayCount } = await supabase
                .from('habit_progress')
                .select('*', { count: 'exact', head: true })
                .in('habit_id', userHabitIds)
                .eq('date', yesterdayStr);

            const { data: userData } = await supabase
                .from('users')
                .select('streak')
                .eq('id', userId)
                .single();

            const currentStreak = userData?.streak || 0;

            if (completedYesterdayCount && completedYesterdayCount > 0) {
                if (currentStreak > 0) {
                    await supabase
                        .from('users')
                        .update({ streak: currentStreak - 1 })
                        .eq('id', userId);
                }
            } else {
                await supabase
                    .from('users')
                    .update({ streak: 0 })
                    .eq('id', userId);
            }
        }

        return false; 
    } else {
        const { error: insertError } = await supabase
            .from('habit_progress')
            .insert({
                habit_id: habitId,
                date: date
            });

        if (insertError) throw insertError;

        if (completedTodayCount === 0) {
            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];


            const { count: completedYesterdayCount } = await supabase
                .from('habit_progress')
                .select('*', { count: 'exact', head: true })
                .in('habit_id', userHabitIds)
                .eq('date', yesterdayStr);

            const { data: userData } = await supabase
                .from('users')
                .select('streak')
                .eq('id', userId)
                .single();

            const currentStreak = userData?.streak || 0;

            if (completedYesterdayCount && completedYesterdayCount > 0) {
                await supabase
                    .from('users')
                    .update({ streak: currentStreak + 1 })
                    .eq('id', userId);
            } else {
                await supabase
                    .from('users')
                    .update({ streak: 1 })
                    .eq('id', userId);
            }
        }

        return true;
    }
};

export const getHabits = async () => {
    const res = await fetch("/data/habits.json");
    const dataHabits = await res.json();

    return dataHabits;
};

export const deleteHabit = async (habitId: number, userId: number) => {
    const { error: progressError } = await supabase
        .from('habit_progress')
        .delete()
        .eq('habit_id', habitId);

    if (progressError) throw progressError;

    const { error: habitError } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

    if (habitError) throw habitError;

    const { count } = await supabase
        .from('habits')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

    if (count === 0) {
        await supabase
            .from('users')
            .update({ streak: 0 })
            .eq('id', userId);
    }
};
