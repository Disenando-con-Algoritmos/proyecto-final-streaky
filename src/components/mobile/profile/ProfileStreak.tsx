type StreakProps = {
    streak: number;
};

export default function ProfileStreak({ streak }: StreakProps) {
    return (
        <div className="flex items-center rounded-[15px] mt-5 lg:mt-0
            border border-neutral-700 text-center w-85 lg:w-105 h-25 lg:h-30">
            <p className="text-[50px] md:text-[65px] ml-7 mr-3">🔥</p>
            <div className="flex flex-col items-start">
                <p className="text-[20px] md:text-[23px] font-semibold">
                    {streak} days of streak
                </p>
                <p className="mt-1 text-[17px] lg:text-[16px] text-gray-400">
                    Keep the fire alive 💪
                </p>
            </div>
        </div>
    );
}