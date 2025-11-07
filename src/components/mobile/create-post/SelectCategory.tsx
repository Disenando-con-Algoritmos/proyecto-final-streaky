import PcSearchBar from "../../desktop/PcSearchBar";
import MobileNavbar from "../nav-bar/MobileNavBar";
import CategoryTagWhite from "./CategoryTagWhite";
import GlobalBtn from "../welcome/GlobalBtn";
import { useNavigate } from "react-router";
import catSelect from "../../../assets/catSelectCategory.png";
import shapeUpLogin from "../../../assets/shapeUpLogin.png";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../redux/slices/SlicePost";
import CategoryModal from "./CategoryModal";

export default function SelectCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (newIsMobile && !isModalOpen) {
        setIsModalOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isModalOpen]);

  useEffect(() => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  }, []);

  const categories = [
    { emoji: "🏃‍♂️", label: "Sport" },
    { emoji: "📚", label: "Study" },
    { emoji: "🤝", label: "Social" },
    { emoji: "🕹️", label: "Hobbies" },
    { emoji: "🥗", label: "Food" },
    { emoji: "❤️", label: "Health" },
    { emoji: "💼", label: "Work" },
    { emoji: "🏠", label: "Home" },
    { emoji: "💵", label: "Money" },
  ];

  const handleCategorySelect = (category: string) => {
    dispatch(setCategory(category));
    if (isMobile) {
      navigate('/createpost');
    }
  };

  // Si es móvil, mostrar el modal
  if (isMobile) {
    return <CategoryModal isOpen={isModalOpen} onClose={() => navigate('/createpost')} />;
  }

  // Versión desktop
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <PcSearchBar />
        <MobileNavbar />
      </div>

      <div
        className="flex justify-center items-center min-h-screen 
        bg-[#1A1A1A] text-[#F9FAFB] relative overflow-hidden pt-[50px]"
      >
        <div className="bg-[#303030] p-9 rounded-3xl 
          max-w-[500px] w-full shadow-md relative z-20">
          <h1 className="font-semibold text-[30px] mb-8 mt-10 text-center">
            Choose category
          </h1>

          <div className="flex gap-2 flex-wrap justify-center mt-6">
            {categories.map((cat, index) => (
              <CategoryTagWhite
                key={index}
                emoji={cat.emoji}
                label={cat.label}
                selected={selectedCategory === cat.label}
                onSelect={() => handleCategorySelect(cat.label)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-11 mb-10">
            <GlobalBtn
              text="Accept"
              type="submit"
              onClick={() => navigate("/createpost")}
            />
          </div>
        </div>

        <img
          src={catSelect}
          alt="Cat Select"
          className="absolute bottom-0 left-[60%] w-[300px] z-80"
        />

        <img 
          src={shapeUpLogin} 
          alt="shapeUpLogin" 
          className="absolute top-[70px] left-[25%] w-[300px] z-10" 
        />
      </div>
    </>
  );
}