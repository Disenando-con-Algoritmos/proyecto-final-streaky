import Inputs from "../components/mobile/signup-login/Inputs";
import AlertPassword from "../components/desktop/AlertPassword";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import catLogin from "../assets/miffy-signup.png";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import GrayShape from "../assets/GrayShape.png";
import Logo3 from "../assets/Logo3.png";
import { useNavigate } from "react-router";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useRef, useState, type FormEvent } from "react";
import authService from "../services/AuthServices";

export default function LogIn() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [passwordAlertMessage, setPasswordAlertMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const dataObj = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.info("LogIn Data:", dataObj);

        console.info("LogIn Data:", dataObj);

        // navigate("/welcome"); // Removed early navigation

        try {
            const result = await authService.signIn(
                dataObj.email as string, dataObj.password as string);

            if (result.success) {
                console.info("User signed in successfully:", result);
                localStorage.setItem("user", JSON.stringify(result.data));
                navigate("/welcome");
            } else {
                console.error("Sign-in failed:", result.error);
                setPasswordAlertMessage("Incorrect password");
                setShowPasswordAlert(true);
                setTimeout(() => setShowPasswordAlert(false), 3000);
            }
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };

    return (
        <div
            id="login-container"
            className="relative min-h-screen flex flex-col items-center 
        justify-between overflow-hidden"
        >
            <AlertPassword show={showPasswordAlert} message={passwordAlertMessage} />
            <div
                id="elements-container"
                className="p-4 sm:p-6 rounded-lg mt-22 sm:mt-12"
            >
                <h1 className="font-bold text-[30px] md:text-[40px] leading-tight">
                    Log In
                </h1>
                <p className="text-[18px] md:text-[18px] mt-2 text-gray-200">
                    Welcome back! you’ve been missed ✨
                </p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center gap-4 mt-8"
                >
                    <Inputs name="email"
                        label="Email" type="email" placeholder="Enter Email" required
                    >
                        <MdOutlineEmail />
                    </Inputs>

                    <Inputs name="password"
                        label="Password" type="password" placeholder="Enter Password" required
                    >
                        <MdLockOutline />
                    </Inputs>

                    <div
                        id="btn-container"
                        className="flex justify-center mt-6 w-full"
                    >
                        <div className="hover:scale-105 w-[160px]">
                            <GlobalBtn text="Log In" type="submit" />
                        </div>
                    </div>
                </form>


                <p className="text-center mt-4 text-sm sm:text-base ">
                    Not a member?
                    <span className="font-semibold cursor-pointer hover:underline p-2" onClick={
                        () => navigate("/signup")
                    }>
                        Sign Up
                    </span>
                </p>
            </div >

            <div
                className="bg-[#222222] 
        absolute left-0 top-6 
        w-25 lg:w-[200px] 
        h-10 md:h-15 
        rounded-r-4xl flex items-center justify-end pr-3"
            >
                <img
                    className="w-6 mr-3 lg:w-8 cursor-pointer"
                    onClick={() => navigate("/")}
                    src={Logo3}
                    alt="Streaky Logo"
                />
            </div>

            <img
                className="absolute bottom-0 left-[-40px] sm:left-[-55px] md:left-[-70px] 
            w-[180px] sm:w-[220px] lg:w-[270px] lg:mb-0 mb-20"
                src={GrayShape}
                alt="Gray Shape"
            />

            <img
                className="absolute top-[-10px] right-[-50px] md:right-[-100px] 
            w-[140px] sm:w-[200px] md:w-[260px] lg:w-[270px]"
                src={shapeUpLogin}
                alt="Green Shape"
            />

            <img
                className="absolute bottom-0 mx-auto left-0 right-0 
            h-[220px] md:lg:h-[250px] 
            object-contain"
                src={catLogin}
                alt="Miffy"
            />
        </div >
    );
}
