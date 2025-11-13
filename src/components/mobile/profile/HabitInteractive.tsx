import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import type { Habit } from "../../../types/HabitsTypes";

interface DayProgressGridProps {
  habit: Habit;
}

const DayProgressGrid: React.FC<DayProgressGridProps> = ({ habit }) => {
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
      className="
    bg-[#1B1B1B] rounded-2xl p-4 lg:p-5 mb-5
    w-80 lg:w-[420px]
    transition-all duration-300
    overflow-hidden
  "
    >
      {/* Header del hábito */}
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center gap-5 lg:gap-12">
          <div className="flex items-center">
            <div className="mr-2 lg:mr-3">
              <div
                className="text-2xl lg:text-3xl flex items-center justify-center
              w-12 h-12 lg:w-15 lg:h-15 rounded-4xl bg-[#4E4E4E]"
              >
                <span className="mb-1 lg:mb-2">{habit.icon}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-semibold text-base lg:text-lg mb-1">
                {habit.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">

                {/* botón que abre/cierra el calendario */}
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
                <div className="bg-[#4E4E4E] w-[1px] h-5"></div>
                <span
                  className="
    inline-flex items-center
    bg-transparent
    border-1 border-white
    text-gray-300
    rounded-full
    px-2 lg:px-3 py-1 lg:py-3
    lg:h-[30px]
    text-[10px] lg:text-xs
    font-normal
    transition-all"
                >
                  {/* separar emoji */}
                  <span className="mr-2 lg:text-xl">{habit.category.split(' ')[0]}</span>
                  {/* separar texto */}
                  <span>{habit.category.split(' ').slice(1).join(' ')}</span>
                </span>

              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleCheck}
              className={`w-11 h-11 lg:w-15 lg:h-15 rounded-full flex items-center 
                justify-center transition-all duration-300 cursor-pointer
              ${
                progress[27]
                  ? "bg-[#B1F042] hover:bg-[#C9F75A]"
                  : "bg-[#2B2B2B]"
              }`}
            >
              <FaCheck
                className={`text-lg ${
                  progress[27] ? "text-[#4B4B4B]" : "text-[#000000]"
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

          {/* ✅ Botón que marca el último día */}

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

export default DayProgressGrid;
