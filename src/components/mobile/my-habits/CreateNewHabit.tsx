import { FaPlus } from "react-icons/fa6";

function CreateNewHabit() {
  return (
    <div className="mt-5">
      <div className="w-100% h-50 bg-[#1B1B1B] rounded-xl">
        <div className="flex">
          <div>
            <p className="text-2xl font-semibold">Create a New Habit</p>
            <p className="text-[17px]">Start a new Goal!</p>
          </div>
          <div
            className="w-15 h-15 bg-[#B1F042] rounded-[100px] 
            flex flex-col items-center justify-center"
          >
            <FaPlus className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewHabit;
