type StreakProps = {
    streak: number;
};

export default function Streak({ streak }: StreakProps) {
    return (
        <div className="md:m-1 m-4">
            <div
                className="bg-[#956EFF] mt-10 mb-11 p-3 rounded-[17px] 
                        flex justify-center md:justify-start 
                        items-center text-white shadow-md w-full"
            >
                <p className="text-[35px] md:text-[40px] mr-2">🔥</p>
                <p className="text-[16px] md:text-[18px] text-center md:text-left">
                    Amazing! You’ve kept your streak for{" "}
                    <strong>
                        {streak} days
                    </strong>
                </p>
            </div>
        </div>
    );
}
