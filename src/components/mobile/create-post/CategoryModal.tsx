import { useDispatch } from 'react-redux';
import { setCategory } from '../../../redux/slices/SlicePost';
import CategoryTagWhite from './CategoryTagWhite';
import GlobalBtn from '../welcome/GlobalBtn';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const dispatch = useDispatch();
  
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#303030] p-6 rounded-3xl max-w-[500px] w-full shadow-md">
        <h1 className="font-semibold text-[24px] mb-6 text-center text-white">
          Choose category
        </h1>

        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat, index) => (
            <CategoryTagWhite
              key={index}
              emoji={cat.emoji}
              label={cat.label}
              onSelect={() => handleCategorySelect(cat.label)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <GlobalBtn
            text="Close"
            type="button"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}