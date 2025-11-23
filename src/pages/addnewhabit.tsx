import PcSearchBar from "../components/desktop/PcSearchBar";
import Alert from "../components/desktop/Alert";
import { useNavigate } from "react-router";
import { useState } from "react";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";


export default function AddNewHabit() {
  const nav = useNavigate();
  const NavigateProfile = () => nav("/profile");

  const [emoji, setEmoji] = useState("🤯");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [habitName, setHabitName] = useState("");
  const [habitDesc, setHabitDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const days = [
    { key: 'Su', label: 'Sunday' },
    { key: 'Mo', label: 'Monday' },
    { key: 'Tu', label: 'Tuesday' },
    { key: 'We', label: 'Wednesday' },
    { key: 'Th', label: 'Thursday' },
    { key: 'Fr', label: 'Friday' },
    { key: 'Sa', label: 'Saturday' }
  ];

  const categories = [
    { id: 'sport', label: '🏃‍♂️ Sport' },
    { id: 'study', label: '📚 Study' },
    { id: 'social', label: '💝 Social' },
    { id: 'hobbies', label: '🎨 Hobbies' },
    { id: 'food', label: '🍎 Food' },
    { id: 'health', label: '❤️ Health' },
    { id: 'work', label: '💼 Work' },
    { id: 'home', label: '🏠 Home' },
    { id: 'money', label: '💰 Money' }
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || selectedDays.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    console.log("📋 New Habit Created:", {
      name: habitName,
      description: habitDesc,
      category: selectedCategory,
      days: selectedDays,
      emoji: emoji
    });

    nav("/welcome/habitAdded");
  };

  return (
    <>
      <PcSearchBar />
      <MobileNavbar />
      <Alert show={showAlert} />

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mt-10 md:mt-10 relative md:mb-10">
          <div className="flex justify-between items-center px-5 w-full max-w-md">

            <button
              onClick={() => nav(-1)}
              className="absolute top-4 right-4 md:hidden text-white text-2xl p-2"
            >
              ✕
            </button>

            <div
              onClick={NavigateProfile}
              className="hidden md:flex items-center gap-3 fixed right-40 mt-20 cursor-pointer"
            >
              <img
                src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
                alt="Profile"
                className="w-17 h-17 rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-[#F9FAFB] text-[19px]">
                  Jenny Torres
                </p>
                <p className="text-[#A1A1AA] text-sm text-[14px]">Your Profile</p>
              </div>
            </div>

          </div>

          <img
            src="https://i.imgur.com/O90kfzg.png"
            alt="miffyy"
            className="hidden md:block fixed -bottom-8 right-[2px] w-[400px]"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-black text-[33px] md:text-[42px] leading-tight mt-12">
            Add your new habit
          </h1>

          <div className="flex flex-col items-center mt-6 mb-6">
            <div
              className="w-30 h-30 bg-[#303030] rounded-full 
              flex items-center justify-center mb-2 p-6"
            >
              <input
                type="text"
                value={emoji}
                required
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={2}
                className="text-5xl text-center bg-transparent
                border-none outline-none w-[70px] text-white"
              />
            </div>
            <span className="text-[#ffffff] text-[18px] font-medium">
              Edit Icon
            </span>
          </div>

          <div className="max-w-md w-full mx-auto px-4 mt-6 text-left">
            <label className="block text-[24px] text-[#D1D1D1] font-medium mb-2">
              Add a title
            </label>
            <input
              className="w-full bg-transparent border border-[#833AFF] 
              focus:outline-none focus:border-[#B1F042] transition
              rounded-[12px] py-2 pl-4 pr-4 text-white placeholder-[#5D5D5D]"
              type="text"
              placeholder="Type here"
              required
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          </div>

          <div className="max-w-md w-full mx-auto px-4 mt-6 text-left">
            <label className="block text-[24px] text-[#D1D1D1] font-medium mb-2">
              Add a description
            </label>
            <input
              className="w-full bg-transparent border border-[#833AFF] 
              focus:outline-none focus:border-[#B1F042] transition 
              rounded-[12px] py-2 pl-4 pr-4 text-white placeholder-[#5D5D5D]"
              type="text"
              placeholder="Type here"
              required
              value={habitDesc}
              onChange={(e) => setHabitDesc(e.target.value)}
            />
          </div>

          <div className="max-w-md w-full mx-auto px-4 mt-6 text-left">
            <h2 className="text-[24px] text-white font-bold mb-4">Add your daily routine</h2>
            <div className="flex justify-between mb-8">
              {days.map((day) => (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => toggleDay(day.key)}
                  className={`w-10 h-10 rounded-full flex items-center cursor-pointer
                    justify-center transition-colors
                    ${selectedDays.includes(day.key)
                      ? 'bg-[#B1F042] text-black'
                      : 'bg-[#303030] text-white hover:bg-[#404040]'
                    }`}
                >
                  {day.key}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-md w-full mx-auto px-4 mt-2 text-left">
            <h2 className="text-[24px] text-white font-bold mb-4">Add a category</h2>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`py-2 px-4 rounded-[50px] border transition-all 
                    duration-300 mb-[20px] cursor-pointer
                    ${selectedCategory === category.id
                      ? 'bg-[#B1F042] text-[#171717] font-medium shadow-md '
                      : 'border-white bg-transparent text-white hover:border-[#B1F042] font-medium'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-md w-full mx-auto px-4 mt-8 mb-25 flex justify-center">
            <GlobalBtn text="Add Habit" type="submit" />
          </div>
        </div>

      </form>


    </>
  );
}
