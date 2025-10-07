import { TiHome } from "react-icons/ti";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

function PcSearchBar() {
  return (
    <>
      <div className="bg-[#212121] w-65 h-screen rounded-r-[2rem] absolute">
        <div id="generalPcBar" className="ml-6">
          <div className="flex mt-40">
            <TiHome className="text-white text-4xl" />
            <h2 className="text-[20px] text-gray-50 ml-2 mb-7 font-medium">
              Home
            </h2>
          </div>

          <div id="searchIcon" className="flex mt-3">
            <FaMagnifyingGlass className="text-white text-3xl" />
            <h2 className="text-[20px] text-gray-50 ml-2 mb-7 font-medium">
              Search
            </h2>
          </div>

          <div className="flex items-center mt-3 ml-[-10px]">
            <FiPlus className="text-white text-5xl" />
            <h2 className="text-[20px] text-gray-50 ml-2 font-medium">
              Create
            </h2>
          </div>

          <div className="flex mt-60" >
            <HiOutlineLogout className="text-red-700 text-3xl" />
            <h2 className="text-[20px] text-red-700 ml-2 font-bold">Log Out</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcSearchBar;
