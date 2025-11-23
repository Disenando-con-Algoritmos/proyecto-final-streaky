import { useNavigate } from "react-router";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import InfoColor from "../components/mobile/my-habits/AboutStats";
import CreateNewHabit from "../components/mobile/my-habits/CreateNewHabit";
import StatsHabits from "../components/mobile/my-habits/Stat";
import { useEffect, useState } from "react";
import type { UserProfile } from "../types/UserProfileType";
import DayProgressGridStats from "../components/mobile/profile/HabitInteractiveStats";
import miffyPost from "../assets/miffyPost.png";
import { getCurrentUser } from "../services/supabase/userService";
import UserAvatar from "../components/UserAvatar/UserAvatar";

function Habits() {
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
    <div className="min-h-screen text-white">
      {/* Barra superior */}
      <PcSearchBar />
      <MobileNavbar />

      {/* Encabezado */}
      <div className="flex justify-center items-center mt-8 md:mt-10 relative md:mb-10">
        <div className="flex justify-between items-center px-5 w-full max-w-6xl">
          {/* Logo móvil */}
          <img
            src="https://i.imgur.com/7IzEEQ5.png"
            alt="Streaky logo"
            className="w-20 md:hidden"
          />

          {/* Perfil desktop */}
          <div
            onClick={NavigateProfile}
            className="hidden md:flex items-center gap-3 fixed right-20 top-10 cursor-pointer"
          >
            {user ? (
              <UserAvatar
                userImage={user.userImage}
                username={user.username}
                size="w-16 h-16"
                textSize="text-2xl"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#B1F042] 
      border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="flex flex-col">
              <p className="font-semibold text-[#F9FAFB] text-lg">
                {user ? user.username : "Loading..."}
              </p>
              <p className="text-[#A1A1AA] text-sm">Your Profile</p>
            </div>
          </div>

          {/* Perfil móvil */}
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

        {/* Gato decorativo desktop */}
        <img
          src="https://i.imgur.com/O90kfzg.png"
          alt="cat deco"
          className="hidden md:block fixed bottom-0 right-0 w-[350px]"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center w-full px-4 md:px-0 mt-6 md:mt-10">
        {/* Título */}
        <p className="text-3xl font-bold ml-70 mr-115 w-50 
        md:mb-2 md:ml-0 md:text-[45px] md:w-57">
          My Habits
        </p>

        {/* Contenedor central */}
        <div className="w-full max-w-md md:max-w-4xl mx-auto space-y-6 flex flex-col items-center">
          <StatsHabits />
          <InfoColor />
          <CreateNewHabit />
          <div className="mt-10 md:mt-12 md:mr-131 mr-60 ml-4">
            <p className="text-2xl md:text-3xl ml-13 font-semibold w-40 mb-[-75px]">In Progress</p>
            <div className="">
              <img className="w-27 relative left-60 bottom-[-37px] 
            md:w-40 md:ml-20 md:left-90 md:bottom-[-45px]" src={miffyPost}></img>
            </div>
          </div>
          <div className="ml-0">
            {user?.habits.map((habit) => (
              <DayProgressGridStats key={habit.id} habit={habit} />
            ))}
          </div>

          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}

export default Habits;
