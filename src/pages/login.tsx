import Inputs from "../components/mobile/signup-login/Inputs";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import catLogin from "../assets/catLogin.png";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import GrayShape from "../assets/GrayShape.png";
import Logo3 from "../assets/Logo3.png";

export default function SignUp() {
  return (
    <div
      id="signup-container"
      className="relative min-h-screen flex flex-col items-center 
        justify-between overflow-hidden"
    >
      <div
        id="elements-container"
        className="p-4 sm:p-6 rounded-lg mt-22 sm:mt-12"
      >
        <h1 className="font-bold text-[26px] sm:text-[40px] leading-tight">
          Log In
        </h1>
        <p className="text-[14px] sm:text-[18px] mt-2 text-gray-200">
          Welcome back! you’ve been missed ✨
        </p>

        <form className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Inputs label="Email" type="email" placeholder="Enter email">
            <MdOutlineEmail />
          </Inputs>

          <Inputs label="Password" type="password" placeholder="Enter password">
            <MdLockOutline />
          </Inputs>

          <button
            className="bg-[#B2F042] w-25 sm:w-27 h-9 sm:h-10 self-center 
      rounded-4xl text-black mt-6 sm:mt-7 font-medium cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-[13px] sm:text-base text-gray-300">
          Not a Member?
          <span className="font-semibold cursor-pointer hover:underline ml-1 text-white">
            Sign Up
          </span>
        </p>
      </div>
      
      <div
        className="bg-[#222222] 
        absolute left-0 top-6 
        w-25 lg:w-[200px] 
        h-10 md:h-[65px] 
        rounded-r-4xl flex items-center justify-end pr-3"
      >
        <img
          className="w-7 sm:w-8 mr-3 lg:w-10"
          src={Logo3}
          alt="Streaky Logo"
        />
      </div>

      <img
        className="absolute bottom-0 left-[-40px] sm:left-[-55px] md:left-[-70px] 
            w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] lg:mb-0 mb-20"
        src={GrayShape}
        alt="Gray Shape"
      />

      <img
        className="absolute top-[-10px] right-[-50px] sm:right-[-95px] md:right-[-120px] 
            w-[140px] sm:w-[200px] md:w-[260px] lg:w-[300px]"
        src={shapeUpLogin}
        alt="Green Shape"
      />

      <img
        className="absolute bottom-0 mx-auto left-0 right-0 
            h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] 
            object-contain"
        src={catLogin}
        alt="Miffy"
      />
    </div>
  );
}
