import Inputs from "../components/mobile/signup-login/Inputs";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import catLogin from "../assets/catLogin.png";
import shapeDownLogin from "../assets/shapeDownLogin.png";
import shapeUpLogin from "../assets/shapeUpLogin.png";

export default function LoginPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div
        id="signup-container"
        className="flex flex-col items-center justify-center h-screen overflow-hidden"
      >
        <div
          id="elements-container"
          className="w-full max-w-sm p-6 rounded-lg flex flex-col mt-10 z-2"
        >
          <h1 className="font-bold text-[40px]">Login</h1>
          <p className="text-[18px] mt-2">
            Welcome back! you´ve been missed ✨
          </p>

          <form className="flex flex-col gap-5 mt-8 w-full">
            <Inputs label="Email" type="email" placeholder="Enter email">
              <MdOutlineEmail />
            </Inputs>

            <Inputs
              label="Password"
              type="password"
              placeholder="Enter password"
            >
              <MdLockOutline />
            </Inputs>

            <button
              className="bg-[#B2F042] w-27 h-10 self-center rounded-4xl 
            text-black mt-7 font-medium cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="flex flex-col items-center mt-6">
            <div className="flex mt-3">
              <p className="font-light flex">Not a member?</p>
              <p className="ml-2 font-bold cursor-pointer hover:border-b-1">
                Sign Up
              </p>
            </div>

            {/* 🐱 Imagen del gato centrada y responsive */}
            <img
              src={catLogin}
              className="w-56 sm:w-64 md:w-72 lg:w-80 object-contain relative z-1"
              alt="cat login"
            />
          </div>
        </div>
      </div>
      <img
  src={shapeDownLogin}
  alt="shape background bottom left"
  className="absolute bottom-0 left-0 
  w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] 
  z-0 object-contain"
/>

<img
  src={shapeUpLogin}
  alt="shape background top right"
  className="absolute top-0 right-0 
  w-[140px] sm:w-[180px] md:w-[240px] lg:w-[300px] 
  z-0 object-contain"
/>
    </div>
  );
}
