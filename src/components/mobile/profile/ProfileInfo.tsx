import { useNavigate } from "react-router";
import type { UserProfile } from "../../../types/UserProfileType";
import BtnEditProfile from "./BtnEditProfile";
import ProfileStreak from "./ProfileStreak";
import { FaRegEdit } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import BtnLogOut from "./BtnLogOut";

type UserProps = {
    user: UserProfile;
};

export default function ProfileInfo({ user }: UserProps) {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center justify-center w-full px-6 py-8
            lg:flex-row lg:justify-between lg:items-center
            lg:ml-[260px] lg:pr-10 lg:max-w-[calc(100%-260px)]"
        >
            {/* info perfil, foto + name */}
            <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-6">
                <img
                    src={user.userImage}
                    alt={user.username}
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover mb-4 lg:mb-0"
                />

                <div className="text-center lg:text-left">
                    <div className="flex flex-col items-center lg:flex-row 
                    lg:items-center lg:gap-4">
                        <h1 className="text-2xl lg:text-4xl font-bold">{user.username}</h1>

                        {/* botones visibles en mobile */}
                        <div className="flex flex-col gap-2 mt-3 lg:hidden">
                            <BtnEditProfile
                                text="Edit Profile"
                                type="button"
                                onClick={() => navigate("/edit-profile")}
                            >
                                <FaRegEdit />
                            </BtnEditProfile>

                            <BtnLogOut text="Log Out">
                                <LuLogOut />
                            </BtnLogOut>
                        </div>

                        {/* botones visibles en desktop */}
                        <div className="hidden lg:block">
                            <BtnEditProfile
                                text="Edit Profile"
                                type="button"
                                onClick={() => navigate("/edit-profile")}
                            >
                                <FaRegEdit />
                            </BtnEditProfile>
                        </div>
                    </div>

                    <p className="mt-2 text-[16px] lg:text-[18px] text-gray-400">
                        {user.userDescription}
                    </p>

                    <div className="flex justify-center lg:justify-start gap-8 mt-4">
                        <div className="text-center">
                            <p className="text-[18px] lg:text-[22px] font-semibold">
                                {user.habits.length}
                            </p>
                            <p className="text-gray-400 text-sm lg:text-md">Habits</p>
                        </div>

                        <div className="text-center">
                            <p className="text-[18px] lg:text-[22px] font-semibold">
                                {user.followers}
                            </p>
                            <p className="text-gray-400 text-sm lg:text-md">Followers</p>
                        </div>

                        <div className="text-center">
                            <p className="text-[18px] lg:text-[22px] font-semibold">
                                {user.following}
                            </p>
                            <p className="text-gray-400 text-sm lg:text-md">Following</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* racha del usuario */}
            <div className="mt-6 lg:mt-0">
                <ProfileStreak streak={user.streak} />
            </div>
        </div>
    );
}