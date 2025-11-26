import { useEffect, useState } from "react";
import Post from "../components/mobile/feed/Post";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import PcSearchBar from "../components/desktop/PcSearchBar";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/supabase/userService";
import type { UserProfile } from "../types/UserProfileType";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import Streak from "../components/mobile/feed/Streak";

function Feed() {
  const nav = useNavigate();
  const NavigateProfile = () => nav("/welcome/profile");
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <PcSearchBar></PcSearchBar>
      <MobileNavbar />
      {/* header de logo mas profile */}
      <div id="feed-container"
        className="flex justify-center items-center mt-10 md:mt-10 relative md:mb-10 ">
        <div
          className="flex justify-between items-center px-5
                w-full max-w-md "
        >
          <img
            src="https://i.imgur.com/7IzEEQ5.png"
            alt="Streaky logo"
            className="w-24 md:w-28 md:hidden"
          />

          {/* este es el perfil de solo desktop*/}
          {/* esta imagen no se puede poner en un espacio abajo pq se deja de ver en 
                    el navegador */}
          <div
            onClick={NavigateProfile}
            className="hidden md:flex items-center gap-3 fixed right-40 mt-20 cursor-pointer">
            {user ? (
              <UserAvatar
                userImage={user.userImage}
                username={user.username}
                size="w-17 h-17"
                textSize="text-2xl"
              />
            ) : (
              <div className="w-17 h-17 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#B1F042] 
                border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="flex flex-col">
              <p className="font-semibold text-[#F9FAFB] text-[19px]">
                {user ? user.username : "Loading..."}
              </p>
              <p className="text-[#A1A1AA] text-sm text-[14px]">Your Profile</p>
            </div>
          </div>

          {/* perfil pequeña de mobileeee */}
          {/* esta imagen no se puede poner en un espacio abajo pq se deja de ver en 
                    el navegador */}
          <div onClick={() => nav("/welcome/profile")} className="md:hidden">
            {user ? (
              <UserAvatar
                userImage={user.userImage}
                username={user.username}
                size="w-12 h-12"
                textSize="text-lg"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#B1F042] 
                border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
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
      <div className="flex flex-col justify-center">
        <div
          className="max-w-md w-full mx-auto 
            "
        >
          <div className="text-center md:text-left">
            <h1
              className="font-black text-[33px] md:text-[42px] 
                    leading-tight md:mr-10 mr-33 mt-12"
            >
              Hello, {user ? user.username : "Loading..."}! 👋🏻
            </h1>

            <p className="text-[#F9FAFB] mt-3 text-[15px] md:text-[17px] md:mr-10 mr-55">
              What’s your habit today?
            </p>

            {/* streak */}
            <Streak streak={user ? user.streak : 0} />
          </div>
        </div>

        {/* post de users */}
        <Post />
      </div>
    </>
  );
}

export default Feed;
