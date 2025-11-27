import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../redux/slices/SlicePost";
import { useNavigate } from "react-router";
import CategoryTagWhite from "./CategoryTagWhite";
import MobileNavbar from "../nav-bar/MobileNavBar";
import GlobalBtn from "../welcome/GlobalBtn";
import Alert from "../../desktop/AlertPassword";

interface CategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function CategoryPopup({ isOpen, onClose }: CategoryPopupProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCategorySelect = (category: string) => {
    // Si la categoría ya está seleccionada, la deseleccionamos
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleAccept = () => {
    if (selectedCategory) {
      dispatch(setCategory(selectedCategory));
      onClose();
      navigate('/welcome/createpost');
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-end bg-black/60 z-50 md:hidden ">
      <Alert show={showAlert} message="Please select a category first!" />
      {/* Mobile NavBar arriba */}
      <div className="w-full">
        <MobileNavbar />
      </div>
      <div className="bg-[#303030] w-full max-w-md rounded-t-3xl flex flex-col h-[550px]">
        {/* Header */}
        <div className="relative flex items-center justify-center px-5 pt-6 pb-3">
          <h2 className="text-[#F9FAFB] text-2xl font-semibold text-center mb-4 mt-4">
            Choose Category
          </h2>
          <IoClose
            className="absolute right-5 text-[#F9FAFB] text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Categories grid */}
        <div className="flex-1 px-6 pt-2 ">
          <div className="grid grid-cols-3 gap-3 justify-center">
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
        </div>
        {/* Botón aceptar */}
        <div className="flex justify-center pb-30">
          <GlobalBtn
            text="Accept"
            onClick={handleAccept}
          />
        </div>
      </div>
    </div>
  );
}