import { useEffect, useState } from "react";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import ProfileInfo from "../components/mobile/profile/ProfileInfo";
import DayProgressGrid from "../components/mobile/profile/HabitInteractive";
import type { UserProfile } from "../types/UserProfileType";

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

      <div className="flex flex-col items-center mt-15 px-4 gap-10">
        {user && <ProfileInfo user={user} />}
        {user?.habits && (
          <div className="flex flex-col gap-10 w-full max-w-md">
            {user.habits.map((habit) => (
              <DayProgressGrid key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
