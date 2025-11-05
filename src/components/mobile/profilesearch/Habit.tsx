import type { Habit } from "../../../types/HabitsTypes";

export default function ViewHabit({ habit }: { habit: Habit }) {
    return (
        <div
            className="flex justify-between items-center bg-[#1B1B1B] 
            pl-5 pr-5 pb-10 pt-10 rounded-xl"
        >
            <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 ">
                    <div className="absolute w-15 h-15 bg-[#4E4E4E] rounded-full"></div>
                    <span className="text-[35px] relative z-10">{habit.icon}</span>
                </div>
                <p className="text-[#F9FAFB] text-[18px] font-medium ml-2">{habit.title}</p>
            </div>
            <div
                className="border border-[#B1F042] px-5 py-2 rounded-full text-sm font-normal
                text-[#F9FAFB] w-28"
            >
                {habit.category}
            </div>
        </div>
    );
}
