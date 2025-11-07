import { useNavigate } from "react-router";
import type { UserProfile } from "../../../types/UserProfileType";
import BtnEditProfile from "./BtnEditProfile";
import ProfileStreak from "./ProfileStreak";
import { FaRegEdit } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import BtnLogOut from "./BtnLogOut";
import ProfileStats from "./ProfileStats";

type UserProps = {
    user: UserProfile;
};

export default function ProfileInfo({ user }: UserProps) {
    const navigate = useNavigate();

    return (
        <div
            className=" bg-[#171717] text-[#F9FAFB] 
                md:flex items-center py-13"
        >

            {/* perfil y post */}
            <div className="flex flex-col lg:flex-row w-full lg:items-start lg:justify-center">
                {/* perfil */}
                <div
                    className="flex flex-col items-center lg:flex-row 
                    lg:flex-wrap  lg:ml-40"
                >
                    <div className="flex items-center md:ml-90 gap-5 ">
                        <img
                            src={user.userImage}
                            alt={user.username}
                            className="w-32 h-32 rounded-full object-cover"
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
                                onClick={() => navigate("/edit-profile")}
                            >
                                <FaRegEdit />
                            </BtnEditProfile>

                            <BtnLogOut
                                text="Log Out"
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                <LuLogOut />
                            </BtnLogOut>
                        </div>

                        {/* Desktop: solo botón Edit Profile */}
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

                    {/* Estadísticas */}
                    <div
                        className="w-full mb-8 mt-8 
                            
                            lg:justify-start lg:ml-70 lg:mb-20 lg:mt-0"
                    >
                        <ProfileStats user={user} />
                    </div>
                </div>
            </div>

            {/* racha del usuario */}
            <div className="flex justify-center mt-6 md:mr-8 ">
                <ProfileStreak streak={user.streak} />
            </div>
        </div>
    );
}