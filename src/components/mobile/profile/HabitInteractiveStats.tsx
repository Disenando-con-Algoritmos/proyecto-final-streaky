import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import type { Habit } from "../../../types/HabitsTypes";

interface DayProgressGridProps {
  habit: Habit;
}

const DayProgressGridStats: React.FC<DayProgressGridProps> = ({ habit }) => {
  const allDays = Object.values(habit.progress).flat();
  const [progress, setProgress] = useState<boolean[]>(
    allDays.map((val) => val > 0)
  );
  const [isOpen, setIsOpen] = useState(false);

  // acción: marca o desmarca el último día
  const handleCheck = () => {
    setProgress((prev) => {
      const updated = [...prev];
      updated[27] = !updated[27];
      return updated;
    });
  };

  return (
    <div
      className="bg-[#1B1B1B] rounded-2xl p-5 mb-5 
      w-90 md:w-170 transition-all duration-300"
    >
      {/* Header del hábito */}
      <div className="flex justify-between">
        <div className="flex items-center gap-6 md:gab-12">
          <div className="flex items-center">
            <div className="mr-3">
              <div
                className="text-3xl flex items-center justify-center w-15 
                h-15 rounded-4xl bg-[#4E4E4E]"
              >
                <div className="mb-2">{habit.icon}</div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-lg">
                {habit.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                {/* Botón que abre/cierra el calendario */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-xs font-medium px-4 py-[7px] rounded-full transition-all 
                duration-300 hover:opacity-80"
                  style={{
                    backgroundColor: habit.color + "20",
                    color: habit.color,
                  }}
                >
                  Progress
                </button>

                <div className="bg-[#4E4E4E] w-[2px] h-5"></div>

                <span
                  className="text-xs border-1 border-white 
                text-gray-300 w-20 py-[7px] rounded-full flex flex-col items-center"
                >
                  {habit.category}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleCheck}
              className={`w-10 h-10 md:w-13 md:h-13 rounded-full flex items-center 
                justify-center transition-all duration-300 cursor-pointer ml-0 md:ml-74
              ${
                progress[27]
                  ? "bg-[#2B2B2B]"
                  : "bg-[#B1F042] hover:bg-[#C9F75A]"
              }`}
            >
              <FaCheck
                className={`text-[15px] md:text-[25px] ${
                  progress[27] ? "text-[#4B4B4B]" : "text-[#1C1B1F]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Calendario desplegable */}
      {isOpen && (
        <div>
          <p className="text-white text-[20px] font-medium ml-13 mt-4">Past 4 Weeks</p>
        <div className="mt-2 flex flex-col items-center animate-fadeIn">
          <div className="grid grid-cols-7 gap-2">
            {progress.map((done, i) => (
              <div
                key={i}
                className="w-6 h-6 md:w-8 md:h-8 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: done ? habit.color : "#2B2B2B",
                  boxShadow: done ? "0 0 6px rgba(0,0,0,0.3)" : "none",
                }}
              ></div>
            ))}
          </div>

          {/* botón que marca el último día */}

          <div
            className="w-28 h-8 bg-[#EF3131] mt-5 flex 
          flex-col items-center justify-center rounded-4xl cursor-pointer"
          >
            <button className="text-[15px] font-medium text-white cursor-pointer">
              Delete Habit
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default DayProgressGridStats;
