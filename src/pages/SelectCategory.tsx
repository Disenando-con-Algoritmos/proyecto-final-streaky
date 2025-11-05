import PcSearchBar from "../components/desktop/PcSearchBar";

import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

export default function SelectCategory() {
    return (
        <>
            {/* Navbar (desktop + mobile) */}
            <div>
                <PcSearchBar />
                <MobileNavbar />
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex justify-center items-center min-h-screen relative">
                <div className="bg-[#303030] text-[#F9FAFB] p-9 rounded-4xl 
                max-w-[600px] w-full shadow-md relative z-10">
                    <h1 className="font-semibold text-[30px] mb-4">
                        Choose category
                    </h1>
                    <div className="flex gap-2 flex-wrap justify-center mt-6">

                    </div>

                </div>
            </div>
        </>
    );
}
