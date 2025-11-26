import { GoHome } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const location = useLocation(); // detecta la ruta actual del navegador :3

   // Determinar botón activo según ruta
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const activeColor = "#833AFF";

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 
        bg-[#111111] h-[70px]
        rounded-t-[2rem] flex items-center justify-around
        shadow-md z-40 sm:hidden"
    >

      <button
        onClick={() => navigate("/welcome/feed")}
        className="flex items-center justify-center w-14 h-14"
      >
        <GoHome
          className={`text-3xl transition-all duration-300 ${
            isActive("/welcome/feed") ? "text-[#833AFF]" : "text-[#8F8F8F]"
          }`}
        />
      </button>

      <motion.button
        animate={{
          scale: isActive("/welcome/createPost") ? 1.2 : 1,
          backgroundColor: isActive("/welcome/createPost")
          ? activeColor
          : "rgba(32,32,32,0.9)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => navigate("/welcome/createPost")}
        className="
          -mt-6 w-14 h-14 rounded-full flex items-center justify-center
          shadow-md" 
      >
        <FiPlus className={`text-3xl transition-all duration-300 ${
            isActive("/welcome/createPost") ? "text-white" : "text-[#8F8F8F]"
          }`} 
        />
      </motion.button>

      <button
        onClick={() => navigate("/welcome/userSearch")}
        className="flex items-center justify-center w-14 h-14"
      >
        <FaMagnifyingGlass
        className={`text-2xl transition-all duration-300 ${
            isActive("/welcome/userSearch") ? "text-[#833AFF]" : "text-[#8F8F8F]"
          }`}
        />
      </button>
    </nav>
  );
}
