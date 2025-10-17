import words from "../../../assets/words.png";
import mockup1 from "../../../assets/mockup1.png";
import { useNavigate } from "react-router";

export default function MakeEveryDay() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col md:flex-row items-center 
        justify-between text-white">
            <div className=" md:text-left md:w-1/2 px-6 md:px-0 w-150 ml-30">
                <img src={words} className="mx-auto md:mx-0 
                ml-[-20px] w-120 md:w-[600px]" />
                <h2 className="text-[30px] md:text-5xl font-bold ml-10 mb-4 mt-15">
                    Make every day <span className="text-[#A374FF]">count</span>
                </h2>
                <p className="text-[#D1D5DB] mb-6 md:ml-10 text-[25px] md:text-[25px] ml-10">
                    Build habits, keep streaks,
                    <span className="block md:inline">share your journey!</span>
                </p>


                <button className="bg-[#B2F042] text-black font-medium
                px-8 py-3 rounded-full hover:scale-105 transition md:w-40 w-40 ml-10 cursor-pointer"
                onClick={ 
                    ()=> navigate("/signUp")} > 
                    Start Now
                </button>
            </div>

            <div className="flex justify-center  ">
                <img src={mockup1}  className="w-full max-w-none 
                scale-[1.5] ml-30 md:scale-100 md:w-[700px] " />
            </div>
        </section>
    );
}
