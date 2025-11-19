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

function Habits() {
  const nav = useNavigate();
  const NavigateProfile = () => nav("/welcome/profile");
  const [user, setUser] = useState<UserProfile | null>(null);
  const userId = 5;

  useEffect(() => {
      fetch("/data/habits.json")
        .then((res) => res.json())
        .then((data: UserProfile[]) => {
          const foundUser = data.find((u) => u.id === userId);
          setUser(foundUser || null);
        });
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
            <img
              src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-[#F9FAFB] text-lg">
                Jenny Torres
              </p>
              <p className="text-[#A1A1AA] text-sm">Your Profile</p>
            </div>
          </div>

          {/* Perfil móvil */}
          <img
            onClick={() => nav("/welcome/profile")}
            src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full md:hidden"
          />
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
