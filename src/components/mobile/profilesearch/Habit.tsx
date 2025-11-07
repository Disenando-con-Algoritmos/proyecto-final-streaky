import type { Habit } from "../../../types/HabitsTypes";

export default function ViewHabit({ habit }: { habit: Habit }) {
    return (
        <div
            className="flex justify-between items-center bg-[#1B1B1B] 
            pl-5 pr-5 pb-10 pt-10 rounded-xl"
        >
            <div className="flex items-center gap-0">
                <div className="relative flex items-center justify-center w-19 h-12 ">
                    <div className="absolute lg:w-13 lg:h-13
                    w-16 h-16 bg-[#4E4E4E] rounded-full"></div>
                    <span className="text-[35px] lg:text-[27px] relative z-10">{habit.icon}</span>
                </div>
                <p className="text-[#F9FAFB] text-[20px] lg:text-[17px] 
                font-medium ml-2 lg:mr-2">
                {habit.title}</p>
            </div>
            <div
                className="border border-[#B1F042] px-5 py-2 lg:px-4
                rounded-full text-[14px] lg:text-[12px]lg:ml-100 font-normal
                text-[#F9FAFB] flex items-center justify-center whitespace-nowrap"
            >
                {habit.category}
            </div>

        </div>
    );
}
