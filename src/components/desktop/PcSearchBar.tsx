import { useEffect, useRef, useState } from "react";
import { TiHome } from "react-icons/ti";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import type { PostTypes } from "../../types/PostTypes";
import { getPost } from "../../services/PostService";
import { useLocation, useNavigate } from "react-router";

function PcSearchBar() {
  const [ClickSearch, setClickSearch] = useState(true);
  const [Users, setUsers] = useState<PostTypes[]>([]);
  const [Search, setSearch] = useState("");
  const nav = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  function PcSearchBarOpen() {
    setClickSearch(!ClickSearch);
  }

  useEffect(() => {
    async function fetchUsers() {
      const data = await getPost();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setClickSearch(true);
      }
    }

    if (!ClickSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ClickSearch]);

  const NavigateNavBarPccreatepost = () => { nav("/createPost"); };
  const NavigateNavBarPcFeed = () => { nav("/feed"); };
  const NavigateNavBarPcLogin = () => { nav("/login"); };
  const isFeed = location.pathname === "/feed";
  const isCreatePost = location .pathname === "/createPost";

  return (
    <>
      {ClickSearch ? (
        <div></div>
      ) : (
        <div
          ref={sidebarRef}
          className="hidden lg:block bg-[#1E1E1E] h-screen rounded-r-[2rem] w-90 ml-23 z-50
          transition-all fixed top-0 left-0"
        >
          <h1 className="text-white text-2xl ml-7 mt-23 mb-3 cursor-pointer">
            Search
          </h1>
          <div className="relative w-[80%] ml-7" id="search-deploy">
            <div className="flex justify-center">
              <FaMagnifyingGlass
                className="absolute left-3 top-5 transform -translate-y-1/2 text-[#E7E7E7] text-lg"
              />
              <CgClose
                onClick={() => setSearch("")}
                className="absolute left-63 top-5 transform -translate-y-1/2
                 text-gray-400 text-2xl font-black cursor-pointer"
              />
              <input
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#2A2A2A] text-gray-200 p-2 pl-10 rounded-full 
                w-full focus:outline-none focus:ring-2 focus:ring-[#B1F042]"
                placeholder="Search..."
              />
            </div>
            <div className="mt-4 max-h-130 overflow-y-auto pr-2 scrollbar-thin 
            scrollbar-thumb-gray-600">
              {Search !== "" &&
                Users.filter((user) =>
                  user.username.toLocaleLowerCase().includes(Search)
                ).map((UserIndividual) => (
                  <div
                    className="flex items-center mb-3 mt-3 p-2 rounded-4xl cursor-pointer"
                    key={UserIndividual.id}
                  >
                    <img
                      className="w-13 h-13 rounded-4xl"
                      src={UserIndividual.userImage}
                    />
                    <div>
                      <p className="text-white ml-2">{UserIndividual.username}</p>
                      <p className="text-[#B3B3B3] ml-2 text-[12px]">
                        {UserIndividual.userDescription}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`hidden lg:block bg-[#212121] h-screen rounded-r-[2rem] w-65
          fixed top-0 left-0 z-0`}
      >
        <div id="generalPcBar" className="ml-10">
          <div className="flex flex-row mt-15 ml-1">
            <img className="w-6 h-9" src={logo1}></img>
            <img
              className={`w-35 ${!ClickSearch ? "opacity-0" : "opacity-100"}`}
              src={logo2}
            ></img>
          </div>

          <div
            onClick={NavigateNavBarPcFeed}
            className="flex items-center mt-10 mb-12 cursor-pointer group w-30"
          >
            <TiHome className={`${isFeed ? 
            `text-[#703EDD] text-4xl transition-colors 
            duration-300 group-hover:text-[#703EDD]` :

             `text-white text-4xl transition-colors 
            duration-300 group-hover:text-[#703EDD]`}`} />
            <h2
            className={`${isFeed ? `text-[20px] ml-3 font-medium text-[#703EDD] 
                 transition-colors duration-300 group-hover:text-[#703EDD] 
                 ${!ClickSearch ? "opacity-0" : "opacity-100"}` 
              : `text-[20px] ml-3 font-medium text-white 
                 transition-colors duration-300 group-hover:text-[#703EDD] 
                 ${!ClickSearch ? "opacity-0" : "opacity-100"}`}`}
            >
              Home
            </h2>
          </div>

          <div
            id="searchIcon"
            className="flex mt-3 cursor-pointer group w-30 mb-10"
            onClick={PcSearchBarOpen}
          >
            <FaMagnifyingGlass className="text-white text-3xl transition-colors 
            duration-300 group-hover:text-[#703EDD]" />
            <h2
              className={`text-[20px] text-gray-50 ml-4 mb-0 font-medium 
                transition-colors duration-300 group-hover:text-[#703EDD] 
    ${!ClickSearch ? "opacity-0" : "opacity-100"}`}
            >
              Search
            </h2>
          </div>

          <div
            onClick={NavigateNavBarPccreatepost}
            className="flex items-center mt-3 ml-[-10px] cursor-pointer group w-30"
          >
            <FiPlus className={`${isCreatePost ? 
            `text-[#703EDD] text-5xl transition-colors 
            duration-300 group-hover:text-[#703EDD]` :

             `text-white text-5xl transition-colors 
            duration-300 group-hover:text-[#703EDD]`}`} />
            <h2
              className={`${isCreatePost ? `text-[20px] ml-3 font-medium text-[#703EDD] 
                 transition-colors duration-300 group-hover:text-[#703EDD] 
                 ${!ClickSearch ? "opacity-0" : "opacity-100"}` 
              : `text-[20px] ml-3 font-medium text-white 
                 transition-colors duration-300 group-hover:text-[#703EDD] 
                 ${!ClickSearch ? "opacity-0" : "opacity-100"}`}`}
            >
              Create
            </h2>
          </div>

          <div
            onClick={NavigateNavBarPcLogin}
            className="flex items-center mt-60 cursor-pointer group w-35"
          >
            <HiOutlineLogout className="text-red-700 text-4xl transition-colors 
            duration-300 group-hover:text-[#831313]" />
            <h2
              className={`text-[20px] text-red-700 ml-2 font-bold transition-colors 
                duration-300 group-hover:text-[#831313] 
${!ClickSearch ? "opacity-0" : "opacity-100"}`}
            >
              Log Out
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcSearchBar;
