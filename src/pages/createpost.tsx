import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import CatSleeping from "../assets/catsleeping.png";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useNavigate } from "react-router";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import grayShape from "../assets/grayShape.png";

export default function CreatePost() {
  const navigate = useNavigate();
  return (
    <div className="relative z-0">
      {/* Fondos */}
      <img
        className="absolute top-[-10px] right-[380px] w-[250px] hidden md:block z-0"
        src={shapeUpLogin}
        alt="shapeUpLoginAndCreate"
      />
      <img
        className="absolute bottom-0 left-[200px] w-[280px] opacity-80 hidden md:block z-0"
        src={grayShape}
        alt="Gray Shape"
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Subimos las barras para que estén siempre encima */}
        <div className="relative z-50">
          <PcSearchBar />
          <MobileNavbar />
        </div>

        {/* Versión desktop */}
        <div className="hidden md:flex justify-center items-center min-h-screen relative">
          <div className="bg-[#303030] text-[#F9FAFB]
           p-9 rounded-4xl max-w-[600px] w-full shadow-md relative z-10">
            <h1 className="flex justify-center font-semibold text-[30px]">
              Create your post
            </h1>
            <img
              src={CatSleeping}
              alt="CatSleeping"
              className="w-[35%] mt-[35px]"
            />
            <textarea
              placeholder="What’s your habit today? 🌟"
              className="bg-[#1B1B1B] p-4 w-full h-[230px] rounded-xl"
            />
            <div
              id="button-violette"
              className="flex justify-center mt-[30px] flex-wrap gap-4"
            >
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden" // lo ocultas
                />
                <label
                  htmlFor="file-upload"
                  className="bg-[#703EDD] hover:bg-[#5c32b6]
    duration-300 p-3 rounded-[50px] w-[130px] text-[#ffffff]
    font-medium text-lg shadow-md hover:shadow-lg hover:scale-105 transition
    text-center cursor-pointer inline-block"
                >
                  Image
                </label>
              </div>
              <button onClick={() => navigate("/select")}
                className="bg-[#703EDD] hover:bg-[#5c32b6]
                duration-300 p-3 rounded-[50px] w-[200px]
                text-[#ffffff] font-medium text-lg shadow-md
                hover:shadow-lg hover:scale-105 transition"

              >
                Choose Category
              </button>
            </div>

            <div className="flex justify-center mt-[20px]">
              <GlobalBtn
                text="Publish Post"
                type="submit"
                onClick={() => navigate("/profile")}
              />
            </div>
          </div>
        </div>

        {/* Versión móvil */}
        <div
          className=" md:hidden flex flex-col justify-center
          items-start min-h-screen text-[#F9FAFB] px-6 relative"
        >
          {/* Header con logo y perfil solo en móvil */}
          <div className="flex justify-between items-center 
          w-full absolute top-6 left-0 px-6 mt-10 z-50">
            <img
              src="https://i.imgur.com/7IzEEQ5.png"
              alt="Streaky logo"
              className="w-24"
            />
            <img
              src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </div>

          {/* Título alineado a la izquierda */}
          <h1 className="font-semibold text-[26px] text-left w-full ">
            Create your post
          </h1>

          <img
            src={CatSleeping}
            alt="CatSleeping"
            className="w-[45%] mt-[30px] mb-0 block"
          />

          <textarea
            placeholder="What’s your habit today? 🌟"
            className="bg-[#1B1B1B] p-4 w-full h-[230px] rounded-xl mt-2"
          />

          <div
            id="button-violette"
            className="flex items-center mt-[30px] gap-4 w-full"
          >
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden" // lo ocultas
              />
              <label
                htmlFor="file-upload"
                className="bg-[#703EDD] hover:bg-[#5c32b6]
    duration-300 p-3 rounded-[50px] w-[130px] text-[#ffffff]
    font-medium text-lg shadow-md hover:shadow-lg hover:scale-105 transition
    text-center cursor-pointer inline-block"
              >
                Image
              </label>
            </div>
            <button
              className="bg-[#703EDD] hover:bg-[#5c32b6]
              duration-300 p-3 rounded-[50px] w-[70%]
              text-[#ffffff] font-medium text-lg shadow-md
              hover:shadow-lg hover:scale-105 transition"
            >
              Choose Category
            </button>
          </div>

          <div className="flex justify-center mt-[55px] lg:-mt[20px] w-full">
            <GlobalBtn
              text="Publish Post"
              type="submit"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
