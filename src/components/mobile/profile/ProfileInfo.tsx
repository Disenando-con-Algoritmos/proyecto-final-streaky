import { useNavigate } from "react-router";
import type { UserProfile } from "../../../types/UserProfileType";
import BtnEditProfile from "./BtnEditProfile";
import ProfileStreak from "./ProfileStreak";
import { FaRegEdit } from "react-icons/fa";

type UserProps = {
    user: UserProfile;
};

export default function ProfileInfo({ user }: UserProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto p-6">
            <div className="flex items-center gap-6 ml-70">
                <img
                    src={user.userImage}
                    className="w-28 h-28 rounded-full object-cover"
                />
                <div>
                    <div className="flex items-center gap-6">
                        <h1 className="text-4xl font-bold">{user.username}</h1>
                        <BtnEditProfile text="Edit Profile" type="button"
                        onClick={() => navigate("/edit-profile")}
                        >
                            <FaRegEdit />
                        </BtnEditProfile>
                    </div>
                    <p className="mt-3 text-[18px] text-gray-400">{user.userDescription}</p>

                    <div className="flex gap-8 mt-3">
                        <div className="text-center">
                            <p className="text-[22px] font-semibold">{user.habits.length}</p>
                            <p className="text-gray-400 text-md">Habits</p>
                        </div>

                        <div className="text-center">
                            <p className="text-[22px] font-semibold">{user.followers}</p>
                            <p className="text-gray-400 text-md">Followers</p>
                        </div>

                        <div className="text-center">
                            <p className="text-[22px] font-semibold">{user.following}</p>
                            <p className="text-gray-400 text-md">Following</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ProfileStreak streak={user.streak} />
            </div>
        </div>
    );
}