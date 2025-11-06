import catHabitAdded from "../assets/cat-habbit-aded.png";
import greyShape from "../assets/grayShape.png";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useNavigate } from "react-router";

export default function HabitAdded() {
    const navigate = useNavigate();

    return (
        <>
            <MobileNavbar />

        <div
            id="habit-added"
            className="relative flex flex-col items-center 
            justify-center min-h-screen bg-[#171717] text-[#F9FAFB] overflow-hidden"
        >
            <img
                src={greyShape}
                alt="Decorative Shape"
                className="absolute top-0 right-50 sm:-left-10 w-[80%] sm:w-[30%] opacity-50"
            />

            <div className="z-10 flex flex-col items-center text-center p-6 mb-30">
                <h1 className="text-[45px] sm:text-[60px] font-bold">Well Done!</h1>
                <div className="text-[150px] ml-10 mb-5">🎉</div>

                <p className="text-[20px] sm:text-[25px] text-gray-200 mb-10">
                    You successfully added a <br />new habit!!
                </p>

                    <GlobalBtn
                        text="Continue Training"
                        onClick={() => navigate("/habits")}
                        className="min-w-[190px]"
                    />


            </div>

            <img
                src={catHabitAdded}
                alt="miffy"
                className="absolute bottom-0 left-30 sm:left-280
                 w-[300px] sm:w-[350px] object-contain"
            />
        </div>
        </>
    );
}
