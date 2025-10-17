import catsleeping from "../../../assets/catsleeping.png";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-[#E5E7EB] py-12 text-center relative">
            <div className="flex flex-col items-center gap-4">
                <img
                    src={catsleeping}
                    className="w-[180px] md:w-[250px]"
                />
                <h3 className="text-2xl font-semibold text-white mt-2">Streaky</h3>
                <p>Want to know more about us? ✨</p>
                <p className="text-sm text-[#9CA3AF]">streaky@gmail.com • +1 340 342 7543</p>
            </div>
        </footer>
    );
}
