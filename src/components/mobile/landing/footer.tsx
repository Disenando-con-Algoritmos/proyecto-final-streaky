import catsleeping from "../../../assets/catsleeping.png";

export default function Footer() {
    return (
        <footer className="relative bg-[#303030] text-[#E5E7EB] md:mt-60 py-10 mt-20 text-center 
        md:rounded-t-[100px] rounded-t-[50px]">
            <div className="absolute md:-top-[130px] -top-[90px]
            left-1/2 transform -translate-x-1/2">
                <img
                    src={catsleeping}
                    className="w-[180px] md:w-[250px]"
                />
            </div>

            <div className="flex flex-col items-center gap-4 ">
                <h3 className="text-2xl font-semibold text-white">Streaky</h3>
                <p>Want to know more about us? ✨</p>
                <p className="text-sm text-[#9CA3AF]">
                    streaky@gmail.com • +1 340 342 7543
                </p>
            </div>
        </footer>
    );
}
