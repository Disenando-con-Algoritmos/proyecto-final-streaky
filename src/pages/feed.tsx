import Post from "../components/mobile/feed/Post";

function Feed() {
    return (
        <>
            {/*  */}
            <div className="flex justify-center items-center mt-10 md:mt-10">
                <div className="flex justify-between items-center px-5
                w-full max-w-md mx-auto">
                    <img
                    src="https://i.imgur.com/7IzEEQ5.png"
                    alt="Streaky logo"
                        className="w-24 md:w-28"
                    />
                    <img
                    src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
                    alt="Profile"
                        className="w-12 h-12  rounded-full "
                    />
                </div>
            </div>

            {/* hello jenny dd*/}
            <div className="max-w-md w-full mx-auto mt-15 md:mt-15 px-4 md:px-0">
                <div className="text-center md:text-left">
                    <h1 className="font-black text-[33px] md:text-[42px] 
                    leading-tight md:mr-10 mr-30">
                        Hello, Jenny! 👋🏻
                    </h1>

                    <p className="text-[#F9FAFB] mt-3 text-[15px] md:text-[17px] md:mr-10 mr-55">
                        What’s your habit today?
                    </p>

                    {/*streak */}
                    <div
                        id="streak-container"
                        className="bg-[#956EFF] mt-10 mb-11 p-3 md:p-4  rounded-[17px] 
            flex justify-center md:justify-start items-center text-white shadow-md"
                    >
                        <p className="text-[35px] md:text-[40px] mr-2">🔥</p>
                        <p className="text-[16px] md:text-[18px] text-center md:text-left">
                            Amazing! You’ve kept your streak for <strong>10 days</strong>
                        </p>
                    </div>
                </div>
            </div>

            {/* post de users */}
            <Post />
        </>
    );
}

export default Feed;
