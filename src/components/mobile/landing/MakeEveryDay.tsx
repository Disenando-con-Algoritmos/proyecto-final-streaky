import words from "../../../assets/words.png";
import mockup1 from "../../../assets/mockup1.png";

export default function MakeEveryDay() {
    return (
        <section className="flex flex-col md:flex-row items-center 
        justify-between gap-12 ml-20 py-0 text-white">
            <div className="text-center md:text-left md:w-1/2 px-6 md:px-0">
                <img src={words} alt="Streaky words" className="mx-auto md:mx-0 
                mb-6 w-[250px] md:w-[600px]" />
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                    Make every day <span className="text-[#A374FF]">count</span>
                </h2>
                <p className="text-[#D1D5DB] mb-6 text-[10px] md:text-[25px]">
                    Build habits, keep streaks, share your journey!
                </p>
                <button className="bg-[#A0FF6F] text-black font-semibold 
                px-8 py-3 rounded-full hover:scale-105 transition md:w-40">
                    Start Now
                </button>
            </div>

            <div className="flex justify-center md:w-1/2">
                <img src={mockup1} alt="Mockup phone" className="w-[900px] md:w-[900px]" />
            </div>
        </section>
    );
}
