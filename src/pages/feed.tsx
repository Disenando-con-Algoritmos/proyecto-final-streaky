import Post from "../components/mobile/feed/Post";

function Feed() {
    ;
    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="flex">
                    <img
                        src=
                        "https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
                        className="w-12 h-12 rounded-full"
                    />

                    <img
                        src=
                        "https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
                        className="w-12 h-12 rounded-full"
                    />
                </div>
            </div>

            <div className="max-w-md w-full mx-auto">
                <div className="text-left">
                    <h1 className="font-black text-[33px] leading-tight">
                        Hello, Jenny! 👋🏻
                    </h1>
                    <p className="text-[#F9FAFB] mt-3 text-[15px]">
                        What’s your habit today?
                    </p>
                    <div id="streak-container" className="bg-[#956EFF] mt-10 mb-12 p-3 
                    rounded-[17px]">
                        <div id="text-container" className="flex justify-center items-center">
                            <p className="text-[35px] mr-2">🔥</p> 
                            <p className="text-[16px]" >
                                Amazing! You’ve kept your streak for <strong>10 days</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <Post />
        </>);

}

export default Feed;