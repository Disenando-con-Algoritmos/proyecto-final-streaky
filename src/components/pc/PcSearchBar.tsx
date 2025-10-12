import { TiHome } from "react-icons/ti";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import logo1 from "../../assets/logo1.png"
import logo2 from "../../assets/logo2.png"

function PcSearchBar() {
  const [ClickSearch, setClickSearch] = useState(true);

  function PcSearchBarOpen() {
    setClickSearch(!ClickSearch);
  }

  return (
    <>
      {ClickSearch ? (
        <div></div>
      ) : (
        <div
          className="hidden lg:block bg-[#1E1E1E] h-screen rounded-r-[2rem] absolute w-90 ml-23 z-1"
        >
          <h1 className="text-white text-2xl ml-6 mt-23 mb-3">Search</h1>
          <div className="relative w-[80%] ml-6">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <CgClose className="absolute left-63 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl font-black" />
            <input
              className="bg-[#2A2A2A] text-gray-200 p-2 pl-10 rounded-full w-full focus:outline-none 
              focus:ring-2 focus:ring-gray-500"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      <div className={`hidden lg:block bg-[#212121] h-screen rounded-r-[2rem] absolute w-65`}>
        <div id="generalPcBar" className="ml-10">
          <div className="flex flex-row mt-15 ml-1">
            <img className="w-6 h-9" src={logo1}></img>
            <img className={`w-35 ${!ClickSearch ? "opacity-0" : "opacity-100"}`} src={logo2}></img>
          </div>

          <div className="flex mt-10 mb-6">
            <TiHome className="text-white text-4xl cursor-pointer" />
            <h2 className={`text-[20px] ml-3 mb-7 font-medium text-white 
              cursor-pointer ${!ClickSearch ? "opacity-0" : "opacity-100"}`}>
              Home
            </h2>
          </div>

          <div id="searchIcon" className="flex mt-3">
            <FaMagnifyingGlass
              className="text-white text-3xl hover:text-gray-500 cursor-pointer"
              onClick={PcSearchBarOpen}
            />
            <h2
            onClick={PcSearchBarOpen} 
            className={`text-[20px] text-gray-50 ml-4 mb-7 font-medium 
            cursor-pointer ${!ClickSearch ? "opacity-0" : "opacity-100"}`}>
              Search
            </h2>
          </div>

          <div className="flex items-center mt-3 ml-[-10px]">
            <FiPlus className="text-white text-5xl cursor-pointer" />
            <h2 className={`text-[20px] text-gray-50 ml-2 font-medium 
              cursor-pointer ${!ClickSearch ? "opacity-0" : "opacity-100"}`}>
              Create
            </h2>
          </div>

          <div className="flex mt-60">
            <HiOutlineLogout className="text-red-700 text-4xl cursor-pointer" />
            <h2 className={`text-[20px] text-red-700 ml-2 font-bold 
            cursor-pointer ${!ClickSearch ? "opacity-0" : "opacity-100"}`}
            >Log Out</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcSearchBar;
