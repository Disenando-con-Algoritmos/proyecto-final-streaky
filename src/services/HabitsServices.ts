import { supabase } from "./supabase/config";
import type { Habit } from "../types/HabitsTypes";

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

// Helper to get color based on category (mock implementation)
const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'sport': '#B1F042', // Green
        'study': '#833AFF', // Purple
        'social': '#FF69B4', // Pink
        'hobbies': '#FFA500', // Orange
        'food': '#FF6347', // Tomato
        'health': '#FF0000', // Red
        'work': '#4682B4', // SteelBlue
        'home': '#8B4513', // SaddleBrown
        'money': '#FFD700'  // Gold
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

    // Insert into habits table
    const { data, error } = await supabase
        .from('habits')
        .insert({
            user_id: userId,
            title: title,
            category_id: categoryId,
            icon: icon
            // days: days // REMOVED: Column does not exist in DB yet
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
        .select(`
            id,
            title,
            icon,
            category_id
        `)
        .eq('user_id', userId);

    if (error) {
        console.error("Error fetching habits:", error);
        return [];
    }

    // Fetch progress for the current month for all habits
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

    const { data: progressData, error: progressError } = await supabase
        .from('habit_progress')
        .select('habit_id, date')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .in('habit_id', data.map((h: any) => h.id));

    if (progressError) {
        console.error("Error fetching progress:", progressError);
    }

    return data.map((habit: any) => {
        const category = REVERSE_CATEGORY_MAP[habit.category_id] || 'unknown';

        // Map progress data to the structure expected by UI if needed, 
        // but for the new grid we might just need the raw dates.
        // For now, keeping the mock structure to avoid breaking other components
        // but adding a 'completedDates' field could be useful, or we just rely on the component fetching it.
        // However, the prompt asks for the logic here.

        // Let's attach the raw progress dates to the habit object so the UI can use them
        const habitProgress = progressData?.filter((p: any) => p.habit_id === habit.id).map((p: any) => p.date) || [];

        return {
            id: habit.id,
            title: habit.title,
            category: category,
            color: getCategoryColor(category),
            icon: habit.icon,
            days: habit.days || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Default to all days since DB column is missing
            progress: { // Keep mock for compatibility with other components for now
                monday: [0, 0, 0, 0],
                tuesday: [0, 0, 0, 0],
                wednesday: [0, 0, 0, 0],
                thursday: [0, 0, 0, 0],
                friday: [0, 0, 0, 0],
                saturday: [0, 0, 0, 0],
                sunday: [0, 0, 0, 0]
            },
            completedDates: habitProgress // New field for the interactive grid
        } as unknown as Habit; // Casting to Habit to avoid type errors with the new field if not added to type yet
    });
};

export const toggleHabitCheck = async (habitId: number, date: string) => {
    // Check if it exists
    const { data } = await supabase
        .from('habit_progress')
        .select('id')
        .eq('habit_id', habitId)
        .eq('date', date)
        .single();

    if (data) {
        // Delete if exists (toggle off)
        const { error: deleteError } = await supabase
            .from('habit_progress')
            .delete()
            .eq('id', data.id);

        if (deleteError) throw deleteError;
        return false; // Not completed anymore
    } else {
        // Insert if not exists (toggle on)
        const { error: insertError } = await supabase
            .from('habit_progress')
            .insert({
                habit_id: habitId,
                date: date
            });

        if (insertError) throw insertError;
        return true; // Completed
    }
};

export const getHabits = async () => {
    const res = await fetch("/data/habits.json");
    const dataHabits = await res.json();

    return dataHabits;
};
