import PcSearchBar from "../components/desktop/PcSearchBar";
import CategoryTagWhite from "../components/mobile/create-post/CategoryTagWhite";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

export default function SelectCategory() {
    // Lista de categorías (emoji + nombre)
    const categories = [
        { emoji: "🏃‍♂", label: "Sport" },
        { emoji: "📚", label: "Study" },
        { emoji: "🤝", label: "Social" },
        { emoji: "🕹", label: "Hobbies" },
        { emoji: "🥗", label: "Food" },
        { emoji: "❤", label: "Health" },
        { emoji: "💼", label: "Work" },
        { emoji: "🏠", label: "Home" },
        { emoji: "💵", label: "Money" },
    ];

    return (
        <>
            {/* Navbar (desktop + mobile) */}
            <div>
                <PcSearchBar />
                <MobileNavbar />
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex justify-center items-center min-h-screen relative">
                <div className="bg-[#303030] text-[#F9FAFB] p-9 rounded-3xl 
                        max-w-[600px] w-full shadow-md relative z-10">
                    <h1 className="font-semibold text-[30px] mb-4">
                        Choose category
                    </h1>

                    {/* Contenedor de categorías */}
                    <div className="flex gap-2 flex-wrap justify-center mt-6">
                        {categories.map((cat, index) => (
                            <CategoryTagWhite key={index} emoji={cat.emoji} label={cat.label} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}