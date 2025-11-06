import { useEffect, useState } from "react";
import type { UserProfile } from "../types/UserProfileType";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import ProfileInfo from "../components/mobile/profile/ProfileInfo";
import UserLastPost from "../components/mobile/profile/UserLastPost";

function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const userId = 5; // Jenny

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
                <div className="flex justify-center mt-15">
                    {user && <ProfileInfo user={user} />}
                </div>
                {/* Último post publicado */}
                <div className="w-full flex justify-center ">
                    <UserLastPost userId={userId} />

                </div>
        </>
    );
}

export default ProfilePage;
