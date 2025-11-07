import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/SlicePost";
import catSelect from "../assets/catSelectCategory.png";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import CategoryTagWhite from "../components/mobile/create-post/CategoryTagWhite";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import CategoryPopup from "../components/mobile/create-post/CategoryPopup";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";

export default function SelectCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log('Categoría seleccionada:', category);
  };

  const handleAccept = () => {
    if (selectedCategory) {
      dispatch(setCategory(selectedCategory));
      navigate('/createpost');
    } else {
      alert("Please select a category first!");
    }
  };

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

  // Mostrar popup en móvil
  if (isMobile) {
    return <CategoryPopup isOpen={true} onClose={() => navigate("/createpost")} />;
  }

  // Versión desktop
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <PcSearchBar />
        <MobileNavbar />
      </div>

      <div className="flex justify-center items-center min-h-screen 
      bg-[#1A1A1A] text-[#F9FAFB] relative overflow-hidden pt-[50px]">
        <div className="bg-[#303030] p-9 rounded-3xl max-w-[500px] w-full shadow-md relative z-20">
          <h1 className="font-semibold text-[30px] mb-8 mt-10 text-center">
            Choose category
          </h1>

          <div className="grid grid-cols-3 gap-3 justify-center mt-6">
            {categories.map((cat, index) => {
              const isSelected = selectedCategory === cat.label;
              return (
                <CategoryTagWhite
                  key={index}
                  emoji={cat.emoji}
                  label={cat.label}
                  selected={isSelected}
                  onSelect={() => handleCategorySelect(cat.label)}
                  className="cursor-pointer"
                />
              );
            })}
          </div>
          
          {/* Botón aceptar */}
          <div className="flex justify-center mt-8">
            <GlobalBtn
              text="Accept"
              onClick={handleAccept}
            />
          </div>
        </div>

        <img
          src={catSelect}
          alt="Cat Select"
          className="absolute bottom-0 left-[70%] w-[300px] pointer-events-none"
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