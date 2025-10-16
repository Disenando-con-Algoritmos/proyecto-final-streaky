import Inputs from "../components/mobile/signup-login/Inputs";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import catLogin from "../assets/catLogin.png";

export default function LoginPage() {
  return (
    <div
      id="signup-container"
      className="flex flex-col items-center justify-center h-screen overflow-hidden"
    >
      <div
        id="elements-container"
        className="w-full max-w-sm p-6 rounded-lg flex flex-col mt-10"
      >
        <h1 className="font-bold text-[40px]">Login</h1>
        <p className="text-[18px] mt-2">Welcome back! you´ve been missed ✨</p>

        <form className="flex flex-col gap-5 mt-8 w-full">
          <Inputs label="Email" type="email" placeholder="Enter email">
            <MdOutlineEmail />
          </Inputs>

          <Inputs label="Password" type="password" placeholder="Enter password">
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
            className="w-56 sm:w-64 md:w-72 lg:w-80 object-contain relative"
            alt="cat login"
          />
        </div>
      </div>
    </div>
  );
}
