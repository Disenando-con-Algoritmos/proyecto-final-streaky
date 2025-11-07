import { FaPlus } from "react-icons/fa6";

function CreateNewHabit() {
  return (
    <div className="mt-5">
      <div className="w-100% h-32 bg-[#1B1B1B] rounded-xl flex flex-col justify-center">
        <div className="flex justify-between">

          <div className="ml-7">
            <p className="text-3xl font-medium">Create a New Habit</p>
            <p className="text-[17px] mt-1">Start a new Goal!</p>
          </div>

          <div
            className="w-17 h-17 bg-[#B1F042] rounded-[100px] 
            flex flex-col items-center justify-center mr-7 cursor-pointer">
            <FaPlus className="text-2xl text-[#1C1B1F]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewHabit;
