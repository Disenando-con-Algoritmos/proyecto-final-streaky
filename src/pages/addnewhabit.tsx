import PcSearchBar from "../components/desktop/PcSearchBar";
import AlertPassword from "../components/desktop/AlertPassword";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import { getCurrentUser } from "../services/supabase/userService";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import type { UserProfile } from "../types/UserProfileType";
import { createHabit } from "../services/HabitsServices";


export default function AddNewHabit() {
  const nav = useNavigate();
  const NavigateProfile = () => nav("/welcome/profile");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [emoji, setEmoji] = useState("🤯");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [habitName, setHabitName] = useState("");
  const [habitDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

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
    { id: 'sport', label: '🏃‍♂️ sport' },
    { id: 'study', label: '📚 study' },
    { id: 'social', label: '🤝 social' },
    { id: 'hobbies', label: '🕹️ hobbies' },
    { id: 'food', label: '🥗 food' },
    { id: 'health', label: '💗 health' },
    { id: 'work', label: '💼 work' },
    { id: 'home', label: '🏠 home' },
    { id: 'money', label: '💵 money' }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      setAlertMessage("You must choose a category!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (selectedDays.length === 0) {
      setAlertMessage("You must choose at least one day");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!user) {
      setAlertMessage("User not loaded");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      await createHabit(
        user.id,
        habitName,
        selectedCategory,
        emoji,
        selectedDays
      );

      console.log("📋 New Habit Created:", {
        name: habitName,
        description: habitDesc,
        category: selectedCategory,
        days: selectedDays,
        emoji: emoji
      });

      nav("/welcome/habitAdded");
    } catch (error) {
      console.error("Error creating habit:", error);
      setAlertMessage("Error creating habit. Please try again.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="ml-5 mr-5">
      <PcSearchBar />
      <MobileNavbar />
      <AlertPassword show={showAlert} message={alertMessage} />

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mt-10 md:mt-10 relative md:mb-10">
          <div className="flex justify-between items-center px-5 w-full max-w-md">

            <button
              onClick={() => nav(-1)}
              className="absolute top-4 right-0 md:hidden text-white text-2xl p-2"
            >
              ✕
            </button>

            <div
              onClick={NavigateProfile}
              className="hidden md:flex items-center gap-3 fixed 
                        right-40 mt-20 cursor-pointer"
            >
              {user ? (
                <UserAvatar
                  userImage={user.userImage}
                  username={user.username}
                  size="w-16 h-16"
                  textSize="text-2xl"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#2A2A2A] 
                          flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#B1F042] 
                  border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}


              <div className="flex flex-col">
                <p className="font-semibold text-[#F9FAFB] text-lg">
                  {user ? user.username : "Loading..."}
                </p>
                <p className="text-[#A1A1AA] text-sm">Your Profile</p>
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
          <h1 className="font-black text-[33px] md:text-[42px] leading-tight mt-20">
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
              maxLength={15}
              placeholder="Type here"
              required
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
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
                    duration-300 mb-[20px] cursor-pointer text-[14px]
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
    </div>
  );
}
