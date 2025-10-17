import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

function ProfilePage (){

    return(<>
        <PcSearchBar/>
        <MobileNavbar/>
        <p className="flex flex-col items-center">You are in your profile</p>
    </>);
}

export default ProfilePage;