import { useNavigate } from "react-router";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import InfoColor from "../components/mobile/my-habits/AboutStats";
import CreateNewHabit from "../components/mobile/my-habits/CreateNewHabit";
import StatsHabits from "../components/mobile/my-habits/Stat";

function Habits() {
  const nav = useNavigate();
  const NavigateProfile = () => nav("/profile");

  return (
    <div className="min-h-screen bg-[#0E0E0E] overflow-x-hidden text-white">
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
            onClick={() => nav("/profile")}
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
        <p className="text-3xl md:text-[45px] font-bold text-center mb-6">
          My Habits
        </p>

        {/* Contenedor central */}
        <div className="w-full max-w-md md:max-w-4xl mx-auto space-y-6">
          <StatsHabits />
          <InfoColor />
          <CreateNewHabit />

          <div className="mt-10 md:mt-12">
            <p className="text-2xl md:text-3xl font-medium">In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Habits;
