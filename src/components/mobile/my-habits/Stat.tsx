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

  if (personalCategories.length === 0)
    return <p className="text-center text-gray-400 mt-10">You dont have any habit...</p>;

  const user = personalCategories[0];
  const categories = (user.habits.map((habit) => habit.category));
  const filteredHabits =
    selectedCategory === "All"
      ? user.habits
      : user.habits.filter((habit) => habit.category === selectedCategory);

  return (
    <div className="flex flex-col items-center mt-6 w-full px-4 md:px-0">
      {/* Botones de categoría */}
      <div className="flex gap-3 ml-10 mr-10 w-94 md:w-78 md:mr-102">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-9 py-[5px] rounded-full border text-sm font-medium transition-colors${
            selectedCategory === "All"
              ? "border-[#B1F042] text-[#B1F042] cursor-pointer"
              : "border-[#F9FAFB] hover:border-[#B1F042] hover:text-[#B1F042] cursor-pointer"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-[5px] rounded-full border text-sm font-medium 
              transition-colors cursor-pointer ${
              selectedCategory === category
                ? "border-[#B1F042] text-[#B1F042]"
                : "border-[#F9FAFB] text-white hover:border-[#B1F042] hover:text-[#B1F042]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Título */}
      <div className="w-full max-w-md md:max-w-2xl">
        <p className="text-white text-2xl md:text-3xl font-semibold mt-10">
          Stats
        </p>
      </div>

      {/* Gráfico de barras */}
      <div
        id="BarChart"
        className="flex justify-center items-end w-full max-w-md md:max-w-2xl h-64 md:h-70"
      >
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
          else if (avg <= 0.5) color = "#FF6BB7";
          else if (avg <= 0.75) color = "#703EDD";
          else color = "#B1F042";

          const maxHeight = 220;
          const barHeight = maxHeight * avg;
          const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);

          return (
            <div key={day} className="flex flex-col items-center mx-2">
              <div
                className="w-8 md:w-10 rounded-sm transition-all duration-700 ease-in-out"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: color,
                }}
              ></div>
              <p className="mt-3 text-sm text-gray-300">{dayName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsHabits;
