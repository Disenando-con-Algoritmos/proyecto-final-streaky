import PcSearchBar from "../components/desktop/PcSearchBar";
import InputProfile from "../components/mobile/edit-profile/InputProfile";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import { MdOutlineModeEdit } from "react-icons/md";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useNavigate } from "react-router";

export default function EditProfile() {
    const navigate = useNavigate();

    return (
        <>
            <PcSearchBar />
            <MobileNavbar />
            <div className="min-h-screen flex flex-col items-center justify-center px-6
                lg:ml-[260px] lg:flex lg:justify-center">
                <form className="w-full max-w-md">
                    <InputProfile label="Username" type="text" placeholder="New Username">
                        <MdOutlineModeEdit />
                    </InputProfile>
                    <InputProfile label="Biography" type="text" placeholder="New Biography">
                        <MdOutlineModeEdit />
                    </InputProfile>
                    <InputProfile label="Password" type="password" placeholder="New Password" />
                </form>
                    <GlobalBtn text="Save Changes" type="submit" 
                    onClick={() => navigate("/profile")} />
            </div>
        </>
    );
}
