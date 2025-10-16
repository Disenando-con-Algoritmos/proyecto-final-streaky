import { useState } from "react";
import { GoHome } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function MobileNavbar() {
  const [activeBtn, setActiveBtn] = useState<string>("home");

  const activeColor = "#833AFF";
  const inactiveColor = "#8F8F8F";

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0
        bg-[#111111] h-[70px]
        rounded-t-[2rem] flex items-center justify-around
        shadow-md z-50 sm:hidden
      "
    >

      <button
        onClick={() => setActiveBtn("home")}
        className="flex items-center justify-center w-20"
      >
        <GoHome
          className={`text-3xl transition-all duration-300 ${
            activeBtn === "home" ? "text-[#833AFF]" : "text-gray-400"
          }`}
          style={{
            stroke: activeBtn === "home" ? activeColor : inactiveColor,
            strokeWidth: 0.3,
          }}
        />
      </button>

      <motion.button
        initial={{ scale: 1 }}
        animate={{
          scale: activeBtn === "create" ? 1.2 : 1,
          backgroundColor:
            activeBtn === "create" ? activeColor : "rgba(32,32,32,0.9)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setActiveBtn("create")}
        className="
          -mt-6 w-14 h-14 rounded-full flex items-center justify-center
          shadow-md cursor-pointer
        "
      >
        <FiPlus className="text-white text-3xl" />
      </motion.button>

      <button
        onClick={() => setActiveBtn("search")}
        className="flex items-center justify-center w-20"
      >
        <FaMagnifyingGlass
          className={`text-2xl transition-all duration-300 ${
            activeBtn === "search" ? "text-[#833AFF]" : "text-gray-400"
          }`}
        />
      </button>
    </nav>
  );
}
