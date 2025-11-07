import { useEffect, useState } from "react";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import ProfileInfo from "../components/mobile/profile/ProfileInfo";
import DayProgressGrid from "../components/mobile/profile/HabitInteractive";
import type { UserProfile } from "../types/UserProfileType";
import UserLastPost from "../components/mobile/profile/UserLastPost";

function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const userId = 5;

  useEffect(() => {
    fetch("/data/habits.json")
      .then((res) => res.json())
      .then((data: UserProfile[]) => {
        const foundUser = data.find((u) => u.id === userId);
        setUser(foundUser || null);
      });
  }, []);

  return (
      <>
      <PcSearchBar />
      <MobileNavbar />

      {/* info del perfil */}
      <div className="flex justify-center mt-8 mb-0">
        {user && <ProfileInfo user={user} />}
      </div>

      {/* contenedor principal responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-10 mt-2 px-6">

        {/* columna: hábitos */}
        {user?.habits && (
          <div className="flex flex-col gap-6 lg:w-[35%] order-1 lg:order-2 mt-12">
            <h2 className="text-[24px] font-semibold text-white">Friday ☀️</h2>
            <p className="text-gray-400 mb-1">
              Do 50% of your habits to secure today’s streak!
            </p>
            <hr className="border-[#2B2B2B] mb-2 w-100" />

            {user.habits.map((habit) => (
              <DayProgressGrid key={habit.id} habit={habit} />
            ))}

          </div>
        )}

        {/* columna */}
        <div className="flex justify-center w-full lg:ml-120 lg:w-1/2 order-2 lg:order-1">
          <UserLastPost userId={userId} />
        </div>
      </div>
    </>
  );}

export default ProfilePage;