import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

function CreatePost() {
  return (
    <div>
      <PcSearchBar />
      <MobileNavbar />
      <div className="flex flex-col items-center">
        <p className="text-white">You are in Create Post</p>
      </div>
    </div>
  );
}

export default CreatePost;
