import { useNavigate } from "react-router";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import type { User } from "../types/HabitsTypes";
import { useEffect, useState } from "react";
import { getHabits } from "../services/HabitsServices";
import InfoColor from "../components/mobile/my-habits/AboutStats";
import CreateNewHabit from "../components/mobile/my-habits/CreateNewHabit";

function Habits() {
  const nav = useNavigate();
  const [personalCategories, setpersonalCategories] = useState<User[]>([]);
  const NavigateProfile = () => nav("/profile");

  useEffect(() => {
    async function fetchUsers() {
      const data = (await getHabits()) as User[];
      const jennyData = data.find((user) => user.username === "Jenny");
      setpersonalCategories(jennyData ? [jennyData] : []);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10 md:mt-10 relative md:mb-10">
        <div className="flex justify-between items-center px-5 w-full max-w-md ">
          <img
            src="https://i.imgur.com/7IzEEQ5.png"
            alt="Streaky logo"
            className="w-24 md:w-28 md:hidden"
          />
          <div
            onClick={NavigateProfile}
            className="hidden md:flex items-center gap-3 fixed right-40 mt-20 cursor-pointer"
          >
            <img
              src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
              alt="Profile"
              className="w-17 h-17 rounded-full "
            />
            <div className="flex flex-col">
              <p className="font-semibold text-[#F9FAFB] text-[19px]">
                Jenny Torres
              </p>
              <p className="text-[#A1A1AA] text-sm text-[14px]">Your Profile</p>
            </div>
          </div>
          <img
            onClick={() => nav("/profile")}
            src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full md:hidden"
          />
        </div>
        <img
          src="https://i.imgur.com/O90kfzg.png"
          alt="miffyy"
          className="hidden md:block fixed  
                    -bottom-8 right-[2px] w-[400px]"
        />
      </div>

      <div className="flex flex-col w-180 h-250 ml-100 mt-16">
        <p className="text-white text-[45px] font-bold">My Habits</p>
        <div className="flex mt-8 p-0 items-center">
          <div
            className="border-1 border-[#B1F042] p-1 w-26 rounded-4xl h-9 flex 
          items-center justify-center mr-4 cursor-pointer"
          >
            <p className="flex justify-center">All</p>
          </div>
          {personalCategories.length > 0 &&
            personalCategories[0].habits.map((habit) => (
              <div key={habit.id} className="">
                <div
                  className="border-1 border-white p-1 w-26 rounded-4xl h-9 flex 
                items-center justify-center mr-4 cursor-pointer"
                >
                  <p className="flex justify-center">{habit.category}</p>
                </div>
              </div>
            ))}
        </div>
        <div>
          <p className="text-white text-3xl font-medium mt-13">Stats</p>
        </div>
        <div id="BartChart" className="flex justify-center mt-12">
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Sun</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Mon</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Tue</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Wed</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Thu</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Fri</p>
          </div>
          <div className="text-white mr-5 ml-5 flex flex-col items-center">
            <div
              id="EachBar"
              className="bg-[#B1F042] w-11 h-60 rounded-sm"
            ></div>
            <p className="mt-3">Sat</p>
          </div>
        </div>
        <InfoColor/>
        <CreateNewHabit/>
        <div>
          <p className="text-white text-3xl font-medium mt-15">In Progress</p>
        </div>
      </div>
      <PcSearchBar />
      <MobileNavbar />
    </div>
  );
}

export default Habits;
