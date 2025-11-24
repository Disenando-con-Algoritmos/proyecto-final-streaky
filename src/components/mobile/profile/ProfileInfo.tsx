import { useNavigate } from "react-router";
import type { UserProfile } from "../../../types/UserProfileType";
import BtnEditProfile from "./BtnEditProfile";
import ProfileStreak from "./ProfileStreak";
import { FaRegEdit } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import BtnLogOut from "./BtnLogOut";
import ProfileStats from "./ProfileStats";
import authService from "../../../services/AuthServices";
import UserAvatar from "../../UserAvatar/UserAvatar";

type UserProps = {
    user: UserProfile;
};

export default function ProfileInfo({ user }: UserProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await authService.signOut();

        if (result.success) {
            navigate("/login");
        } else {
            console.error("Error logging out:", result.error);
        }
    };

    return (
        <div
            className=" bg-[#171717] text-[#F9FAFB] 
                md:flex items-center py-13"
        >

            {/* perfil y post */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center">
                {/* perfil */}
                <div
                    className="flex flex-col items-center lg:flex-row 
                    lg:flex-wrap lg:ml-30"
                >
                    <div className="flex items-center md:ml-90 gap-5 ">
                        <UserAvatar
                            userImage={user.userImage}
                            username={user.username}
                            size="w-32 h-32"
                            textSize="text-4xl"
                        />
                        <div className="flex flex-col mt-5 gap-3 mb-8">
                            <h2 className="text-[35px] font-bold">{user.username}</h2>
                            <p className="text-[#B3B3B3] text-[16px] lg:w-50">
                                {user.userDescription}
                            </p>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="mt-3 lg:mt-10 mr-1 flex flex-col sm:flex-row gap-3 mb-18">
                        {/* Mobile: ambos botones */}
                        <div className="flex items-center sm:items-center lg:hidden gap-5">
                            <BtnEditProfile
                                text="Edit Profile"
                                type="button"
                                onClick={() => navigate("/welcome/editprofile")}
                            >
                                <FaRegEdit />
                            </BtnEditProfile>

                            <BtnLogOut
                                text="Log Out"
                                type="button"
                                onClick={handleLogout}
                            >
                                <LuLogOut />
                            </BtnLogOut>
                        </div>

                        {/* Desktop: solo botón Edit Profile */}
                        <div className="hidden lg:block">
                            <BtnEditProfile
                                text="Edit Profile"
                                type="button"
                                onClick={() => navigate("/welcome/editprofile")}
                            >
                                <FaRegEdit />
                            </BtnEditProfile>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div
                        className="w-full mb-8 mt-2 lg:justify-start lg:ml-85 lg:mt-0"
                    >
                        <ProfileStats user={user} />
                    </div>
                </div>
            </div>

            {/* racha del usuario */}
            <div className="flex justify-center md:mr-8 ">
                <ProfileStreak streak={user.streak} />
            </div>
        </div>
    );
}