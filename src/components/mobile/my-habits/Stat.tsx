import { useEffect, useState } from "react";
import type { User } from "../../../types/HabitsTypes";
import { getHabits } from "../../../services/HabitsServices";

function StatsHabits() {
  const [personalCategories, setpersonalCategories] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchUsers() {
      const data = (await getHabits()) as User[];
      const jennyData = data.find((user) => user.username === "Jenny");
      setpersonalCategories(jennyData ? [jennyData] : []);
    }
    fetchUsers();
  }, []);

  if (personalCategories.length === 0) return <p>Cargando...</p>;

  const user = personalCategories[0];
  const categories = Array.from(
    new Set(user.habits.map((habit) => habit.category))
  );
  const filteredHabits =
    selectedCategory === "All"
      ? user.habits
      : user.habits.filter((habit) => habit.category === selectedCategory);

  return (
    <div className="flex flex-col mt-7 mb-2">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`rounded-full border w-25 cursor-pointer ${
            selectedCategory === "All"
              ? "border-[#B1F042] text-[#B1F042]"
              : "border-[#F9FAFB] text-gray-300"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-[5px] border rounded-full cursor-pointer ${
              selectedCategory === category
                ? "border-[#B1F042] text-[#B1F042]"
                : "border-[#F9FAFB] text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        <p className="text-3xl font-medium mt-2 mb-13">Stats</p>
      </div>
      <div id="BartChart" className="flex justify-center mt-4 h-80">
        {[
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].map((day) => {
          const allDayValues = filteredHabits.flatMap(
            (habit) => habit.progress[day as keyof typeof habit.progress]
          );

          const avg =
            allDayValues.length > 0
              ? allDayValues.reduce((a, b) => a + b, 0) / allDayValues.length
              : 0;

          let color = "";
          if (avg <= 0.25) color = "#EF3131"; 
          else if (avg <= 0.5) color = "#FB5EF9"; 
          else if (avg <= 0.75) color = "#8B5CF6"; 
          else color = "#B1F042";

          const maxHeight = 270;
          const barHeight = maxHeight * avg;
          const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);

          return (
            <div className="flex items-end">
            <div
              key={day}
              className="text-white mx-5 flex flex-col items-center "
            >
              <div
                className="w-11 rounded-sm transition-all duration-700 ease-in-out"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: color,
                }}
              ></div>
              <p className="mt-3">{dayName}</p>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsHabits;
