import Inputs from "../components/mobile/signup-login/Inputs";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import  miffySignUp from "../assets/miffy-signup.png";
import logoResponsive from "../assets/logo-responsive.png";
import grayShape from "../assets/grayShape.png";
import greenShape from "../assets/greenShape.png";


export default function SignUp() {
    return(
        <div id="signup-container" className="relative min-h-screen flex flex-col items-center 
        justify-between overflow-x-hidden">
        
            <div id="elements-container" 
            className="w-full max-w-[420px] flex flex-col mt-[140px] sm:mt-[40px] 
            lg:mt-[50px] px-10 sm:px-0 mx-auto">

                <h1 className="font-bold text-[30px] sm:text-[35px]">Sign Up</h1>
                <p className="text-[16px] sm:text-[17px] mt-2">
                    Hello! please create your account 💪🏻
                </p>
            
                <form className="flex flex-col justify-center gap-4 mt-8">
                    
                    <Inputs label="Username" type="text" placeholder="Enter username">
                        <FaRegUser />
                    </Inputs>

                    <Inputs label="Email" type="email" placeholder="Enter email">
                        <MdOutlineEmail />
                    </Inputs>

                    <Inputs label="Password" type="password" placeholder="Enter password" >
                        <MdLockOutline />
                    </Inputs>

                    <Inputs label="Confirm Password" type="password" placeholder="Enter password" >
                        <MdLockOutline />
                    </Inputs>
                </form>

                    <p className="text-center mt-4 text-sm sm:text-base">
                        Already have an account?
                        <span className="font-semibold cursor-pointer hover:underline p-2">
                            Log In
                        </span>
                    </p> 
                    
            </div>
            
            <img className="absolute mt-5 top-5 left-0 w-[100px] sm:w-[150px]"
            src={logoResponsive} alt="Streaky Logo" />

            <img className="absolute bottom-[0] left-[-5px] w-[250px] opacity-25" 
            src={grayShape} alt="Gray Shape" />

            <img className="absolute top-[-10px] right-[-5px] w-[180px] sm:w-[220px]" 
            src={greenShape} alt="Green Shape" />

            <img className="bottom-0 z-0 lg:mt-10 object-contain 
            h-[220px] sm:h-[260px] md:h-[300px] lg:h-[140px]"
            src={miffySignUp} alt="Miffy" />

        </div>
    );
}