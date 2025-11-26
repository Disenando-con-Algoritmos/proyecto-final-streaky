import { useEffect, useState } from "react";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import ProfileInfo from "../components/mobile/profile/ProfileInfo";
import DayProgressGrid from "../components/mobile/profile/HabitInteractive";
import type { UserProfile } from "../types/UserProfileType";
import UserLastPost from "../components/mobile/profile/UserLastPost";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/supabase/userService";
import { followService } from "../services/supabase/followService";

function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        // Fetch follow counts
        followService.getFollowCounts(userData.id).then((counts) => {
          setFollowersCount(counts.followers);
          setFollowingCount(counts.following);
        });
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#B1F042] 
        border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <PcSearchBar />
      <MobileNavbar />

      {/* info del perfil */}
      <div className="flex justify-center mt-8 mb-0">
        {user && (
          <ProfileInfo
            user={user}
            followersCount={followersCount}
            followingCount={followingCount}
          />
        )}
      </div>

      {/* contenedor principal responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-10 px-6">

        {/* columna: hábitos */}
        {user?.habits && (
          <div className="flex flex-col gap-6 lg:w-[35%] order-1 lg:order-2 px-5">
            <h2 className="text-[30px] lg:text-[28px] font-semibold text-white text-left w-full">
              Habits ☀️
            </h2>
            <p className="text-[18px] text-gray-400 mb-1">
              Do almost one of your habits to keep your fire!
            </p>
            <hr className="border-[#2B2B2B] mb-2 w-80 lg:w-100" />

            {user.habits.map((habit) => (
              <DayProgressGrid key={habit.id} habit={habit} userId={user.id} />
            ))}

            <div className="flex justify-center">
              <GlobalBtn text="My Habits" type="button"
                onClick={() => navigate("/welcome/habits")}
              />
            </div>
          </div>
        )}

        {/* columna: last post */}
        <div className="flex justify-center w-full lg:ml-120 order-2 lg:order-1">
          {user && <UserLastPost userId={user.id} />}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;