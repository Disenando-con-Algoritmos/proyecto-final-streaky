import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

export default function EditProfile() {
    return(
        <>
            <PcSearchBar />
            <MobileNavbar />
            <h1 className="flex justify-center">Estas editando tu perfil :3</h1>
        </>
    );
}