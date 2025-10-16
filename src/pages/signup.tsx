import Inputs from "../components/mobile/signup-login/Inputs";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";


export default function SignUp() {
    return(
        <div id="signup-container" className="flex flex-col items-center justify-center mt-6">
            <div id="elements-container" className="w-full max-w-sm p-6 rounded-lg">

                <h1 className="font-bold text-[40px]">Sign Up</h1>
                <p className="text-[18px] mt-2">Hello! please create your account 💪🏻</p>
            
                <form className="flex flex-col gap-4 mt-8">
                    
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

            </div>
        </div>
    );
}