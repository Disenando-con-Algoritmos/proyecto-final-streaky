import words from "../../../assets/words.png";
import mockup1 from "../../../assets/mockup1.png";
import { useNavigate } from "react-router";
import GlobalBtn from "../welcome/GlobalBtn";

export default function MakeEveryDay() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col md:flex-row items-center 
        justify-between text-white">
            <div className=" md:text-left md:w-1/ px-6 md:px-0 w-150 ml-30">
                <img src={words} className="mx-auto md:mx-0 
                ml-[-20px] w-120 md:w-[600px]" />
                <h2 className="text-[30px] md:text-5xl font-bold ml-10 mb-6 mt-15 
                whitespace-nowrap">
                    Make every day <span className="text-[25px] md:text-[40px] 
                    font-medium text-[#FFFFFF] bg-[#FF6BB7] pt-1 pb-3 pl-3 pr-3
                    rounded-2xl">count</span>
                </h2>
                <p className="text-[#D1D5DB] mb-6 md:ml-10 text-[25px] md:text-[25px] ml-10">
                    Build habits, keep streaks,
                    <span className="block md:inline">share your journey!</span>
                </p>

                <div id="btn-container" className="flex m-7 w-[160px] mt-6
                                hover:scale-105 transition">
                    <GlobalBtn text="Start Now" 
                    type="submit" onClick={() => navigate("/signup")} />
                </div>
            </div>

            <div className="flex justify-center  ">
                <img src={mockup1} className="max-w-none 
                w-[700px] ml-50 md:scale-100 md:w-[700px] " />
            </div>
        </section>
    );
}
