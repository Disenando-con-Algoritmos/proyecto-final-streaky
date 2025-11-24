import { useEffect, useState } from "react";
import type { UserProfile } from "../types/UserProfileType";
import catSearch from "../assets/cat-search.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getAllUsers } from "../services/supabase/userService";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import { useNavigate } from "react-router";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import authService from "../services/AuthServices";

export default function SearchPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [inputText, setInputText] = useState("");
  const [usersFilter, setUsersFilter] = useState<UserProfile[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (inputText === "") {
      setUsersFilter([]); // no muestra nada al inicio
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(inputText.toLowerCase())
      );
      setUsersFilter(filtered);
    }
  }, [inputText, users]);

  return (
    <>
      <MobileNavbar />
      <div
        id="search-container"
        className="bg-[#171717] min-h-screen pb-24 text-white flex 
  flex-col items-center font-sans sm:hidden"
      >
        <div className="flex flex-col items-center w-[85%] mt-10 relative">
          <img
            src={catSearch}
            alt="cat"
            className="w-28 mb-[-25px] z-10 translate-x-23 translate-y-[-9px]"
          />

          <div className="relative w-full">
            <FaMagnifyingGlass
              className="absolute left-4 top-1/2 transform -translate-y-1/2
        text-[#B1F042] text-xl pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search user..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-transparent border border-[#B1F042] 
        rounded-xl py-3 pl-12 pr-4
        text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2
        focus:ring-[#B1F042]"
            />
          </div>
        </div>

        <div className="mt-8 w-[85%] flex flex-col gap-5">
          {inputText === "" ? null : usersFilter.length > 0 ? (
            usersFilter.map((user) => (
              <div
                key={user.id}
                onClick={async () => {
                  const currentUser = await authService.getCurrentUser();
                  if (currentUser && currentUser.user_metadata.username === user.username) {
                    nav("/welcome/profile");
                  } else {
                    nav(`/welcome/profile/${user.username}`);
                  }
                }}
                className="flex items-center gap-4 bg-transparent pb-3 cursor-pointer 
                hover:opacity-80 transition"
              >
                <UserAvatar
                  userImage={user.userImage}
                  username={user.username}
                  size="w-14 h-14"
                  textSize="text-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.username}</h2>
                  <p className="text-gray-400 text-sm">{user.userDescription}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center mt-4">
              No users found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
