import type { User } from "../../../types/HabitsTypes";
import type { UserProfile } from "../../../types/UserProfileType";

type Props = {
    user: User | UserProfile;
    followersCount?: number;
    followingCount?: number;
};

export default function HabFoweFowi({ user, followersCount, followingCount }: Props) {
    const displayFollowers = followersCount !== undefined ? followersCount : user.followers;
    const displayFollowing = followingCount !== undefined ? followingCount : user.following;

    return (
        <div className="flex justify-center gap-10 text-center">
            <div>
                <p className="text-[24px] font-semibold">{user.habits.length}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Habits</p>
            </div>
            <div>
                <p className="text-[24px] font-semibold">{displayFollowers.toLocaleString()}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Followers</p>
            </div>
            <div>
                <p className="text-[24px] font-semibold">{displayFollowing.toLocaleString()}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Following</p>
            </div>
        </div>
    );
}
