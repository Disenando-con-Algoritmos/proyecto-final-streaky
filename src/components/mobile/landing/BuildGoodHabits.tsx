import bars from "../../../assets/bars.png";

export default function BuildGoodHabits() {

    return (
        <section className="flex flex-col md:flex-row items-center 
    justify-between md:py-0  text-white">
            <div className="md:text-left md:w-1/2 md:px-30">
                <h2 className="text-[30px] md:text-5xl font-bold mb-4 ml-[40px]">
                    Build good habits!
                </h2>
                <p className="text-[#D1D5DB] text-[20px] md:text-[25px] ml-10 mb-10">
                    Track your habits and keep your streaks alive.
            keep your streaks alive.
                </p>
            </div>

            <div className="flex justify-center md:w-1/2">
                <img src={bars} alt="Stats bars" className="w-[330px] md:w-[500px]" />
            </div>
        </section>
    );
}
