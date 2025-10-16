import Post from "../components/mobile/feed/Post";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import PcSearchBar from "../components/desktop/PcSearchBar";

function Feed() {
    return (
        <>
        <PcSearchBar></PcSearchBar>
        <MobileNavbar /> 
            {/* header de logo mas profile */}
            <div className="flex justify-center items-center mt-10 md:mt-10 relative md:mb-10"> 
                <div className="flex justify-between items-center px-5 w-full max-w-md "> 
                    <img 
                        src="https://i.imgur.com/7IzEEQ5.png" 
                        alt="Streaky logo" 
                        className="w-24 md:w-28 md:hidden" 
                    /> 

                    {/* este es el perfil de solo desktop*/} 
                    <div className="hidden md:flex items-center gap-3 fixed right-40 mt-20"> 
                        <img 
                    src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg" 
                    alt="Profile" 
                            className="w-17 h-17 rounded-full " 
                        /> 
                        <div className="flex flex-col"> 
                            <p className="font-semibold text-[#F9FAFB] text-[19px]">
                            Jenny Torres</p> 
                            <p className="text-[#A1A1AA] text-sm text-[14px]">Your Profile</p> 
                        </div> 
                    </div> 

                    {/* perfil pequeña de mobileeee */} 

                    <img 
                    src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg" 
                    alt="Profile" 
                        className="w-12 h-12 rounded-full md:hidden" 
                    /> 
                </div> 

                {/* miffyyy desktop */} 
                <img 
                    src="https://i.imgur.com/O90kfzg.png" 
                    alt="miffyy" 
                    className="hidden md:block fixed  
                    -bottom-8 right-[2px] w-[400px]" 
                /> 
            </div> 

            {/* hello jenny dd */} 
            <div className="max-w-md w-full mx-auto md:mr-17 mt-15 md:mt-0 
            px-4 md:px-0 md:max-w-[920px]"> 
                <div className="text-center md:text-left"> 
                    <h1 className="font-black text-[33px] md:text-[42px] 
                    md:mr-10 mr-30"> 
                        Hello, Jenny! 👋🏻 
                    </h1> 

                    <p className="text-[#F9FAFB] mt-1.5 text-[15px] md:text-[17px] md:mr-10 mr-55"> 
                        What’s your habit today? 
                    </p> 

                    {/* streak */} 
                    <div 
                        className="bg-[#956EFF] mt-10 mb-11 p-3 md:p-4 rounded-[17px] 
                        flex justify-center md:justify-start items-center text-white 
                        shadow-md w-full md:w-[50%]" 
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
