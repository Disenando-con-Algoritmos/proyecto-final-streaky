import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router";

function CreateNewHabit() {

  const nav = useNavigate();
  return (
    <div className="w-full mt-6 px-4 md:px-0">
      <div
        className="
          bg-[#1B1B1B]
          rounded-2xl
          flex
          items-center
          justify-between
          w-full
          max-w-md md:max-w-2xl
          mx-auto
          h-24 md:h-28
          px-6
        "
      >
        {/* Texto */}
        <div className="flex flex-col justify-center">
          <p className="text-lg md:text-2xl font-semibold text-white">
            Create a New Habit
          </p>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            Start a new goal!
          </p>
        </div>

        {/* Botón */}
        <div
          className="
            w-10 h-10
            md:w-12 md:h-12
            bg-[#B1F042]
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-[#96cf33]
            transition-all
            duration-200
          "
          onClick={() => nav("/newhabit")}
        >
          <FaPlus className="text-lg md:text-xl text-[#1C1B1F]" />
        </div>
      </div>
    </div>
  );
}

export default CreateNewHabit;
