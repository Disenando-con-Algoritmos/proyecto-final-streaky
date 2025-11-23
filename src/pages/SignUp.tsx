import Inputs from "../components/mobile/signup-login/Inputs";
import AlertPassword from "../components/desktop/AlertPassword";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import miffySignUp from "../assets/miffy-signup.png";
import logoResponsive from "../assets/logo-responsive.png";
import grayShape from "../assets/grayShape.png";
import greenShape from "../assets/greenShape.png";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useNavigate } from "react-router";
import { useRef, useState, type FormEvent } from "react";
import authService from "../services/AuthServices";

export default function SignUp() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [passwordAlertMessage, setPasswordAlertMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const dataObj = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        if (dataObj.password !== dataObj.confirmPassword) {
            setPasswordAlertMessage("The password is not the same.");
            setShowPasswordAlert(true);
            setTimeout(() => setShowPasswordAlert(false), 3000);
            return;
        }

        if ((dataObj.password as string).length < 6) {
            setPasswordAlertMessage("Password must be at least 6 characters long!");
            setShowPasswordAlert(true);
            setTimeout(() => setShowPasswordAlert(false), 3000);
            return;
        }

        const additionalInfo = {
            username: dataObj.username as string,
            email: dataObj.email as string,
        };

        console.info("SignUp Data:", dataObj);

        navigate("/login");

        try {
            const result = await authService.signUp(
                dataObj.email as string, dataObj.password as string, additionalInfo);
            if (result.success) {
                console.info("User registered successfully:", result);
                navigate("/login");
            } else {
                console.error("Registration failed:", result.error);
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    return (
        <div
            id="signup-container"
            className="relative min-h-screen flex flex-col items-center 
            justify-between overflow-x-hidden"
        >
            <AlertPassword show={showPasswordAlert} message={passwordAlertMessage} />
            <div
                id="elements-container"
                className="w-full max-w-[420px] flex flex-col mt-[140px] sm:mt-[40px] 
        lg:mt-[50px] px-10 sm:px-0 mx-auto"
            >
                <h1 className="font-bold text-[30px] sm:text-[35px]">Sign Up</h1>
                <p className="text-[16px] sm:text-[17px] mt-2">
                    Hello! please create your account 💪🏻
                </p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center gap-4 mt-8"
                >
                    <Inputs name="username" label="Username" type="text"
                        placeholder="Enter Username" required
                    >
                        <FaRegUser />
                    </Inputs>

                    <Inputs
                        name="email" label="Email" type="email" placeholder="Enter Email"
                        required
                    >
                        <MdOutlineEmail />
                    </Inputs>

                    <Inputs name="password" label="Password" type="password"
                        placeholder="Enter Password" required
                    >
                        <MdLockOutline />
                    </Inputs>

                    <Inputs name="confirmPassword"
                        label="Confirm Password" type="password"
                        placeholder="Confirm Password" required
                    >
                        <MdLockOutline />
                    </Inputs>
                    <div
                        id="btn-container"
                        className="flex justify-center mt-4 w-full"
                    >
                        <div className="hover:scale-105 w-[160px]">
                            <GlobalBtn text="Sign Up" type="submit" />
                        </div>
                    </div>

                </form>

                <p className="text-center mt-4 text-[15px] sm:text-base">
                    Already have an account?
                    <span
                        className="font-semibold cursor-pointer hover:underline p-2"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </span>
                </p>
            </div>
            <img
                className="absolute mt-5 top-5 left-0 w-[100px] sm:w-[150px] cursor-pointer"
                onClick={() => navigate("/")}
                src={logoResponsive}
                alt="Streaky Logo"
            />

            <img
                className="absolute bottom-[0] left-[-5px] w-[250px] opacity-25"
                src={grayShape}
                alt="Gray Shape"
            />

            <img
                className="absolute top-[-10px] right-[-5px] w-[180px] sm:w-[220px]"
                src={greenShape}
                alt="Green Shape"
            />

            <img
                className="bottom-0 z-0 lg:mt-10 object-contain 
        h-[220px] sm:h-[260px] md:h-[300px] lg:h-[150px]"
                src={miffySignUp}
                alt="Miffy"
            />
        </div>
    );
}
