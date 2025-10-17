import { useNavigate } from "react-router";
import mockup2 from "../../../assets/mockup2.png";

export default function Adaptabilities() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col md:flex-row items-center 
        justify-between py-20 pt-8 md:pt-0 md:py-0 md:px-40 text-white">
            <div className="md:text-left  md:w-100px px-15 md:px-0">
                <h2 className="text-[30px] md:text-[46px] font-bold mb-4 ">
                    Adaptability just in a few clicks!
                </h2>
                <p className="text-[#D1D5DB] text-[20px] md:text-[23px] mb-6">
                    Track habits anytime on mobile or desktop. 
                    Streaky 🔥 keeps your progress with you.
                </p>
                <button className="bg-[#B2F042] text-black font-medium px-10 
                py-3 rounded-full hover:scale-105 transition cursor-pointer"
                onClick={ 
                    ()=> navigate("/signUp")}>
                    Join Now
                </button>
            </div>

            <div className="flex justify-center">
                <img src={mockup2} className="md:w-[1000px] w-[900px] md:ml-60" />
            </div>
        </section>
    );
}
