import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/storeRedux/AppReducer";
import { setDescription, setImage, resetPost } from "../redux/slices/SlicePost";
import { useState, type ChangeEvent } from "react";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import CatSleeping from "../assets/catsleeping.png";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import grayShape from "../assets/grayShape.png";
import CategoryPopup from "../components/mobile/create-post/CategoryPopup";

export default function CreatePost() {
  const navigate = useNavigate();
  const [imagePreview, setimagePreview] = useState<string | null>(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post);
  const [text, setText] = useState("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimagePreview(reader.result as string);
        dispatch(setImage(reader.result as string));
      };
      reader.readAsDataURL(file);
    } else {
      setimagePreview(null);
      dispatch(setImage(""));
    }
  };

  const handlePublish = () => {
    dispatch(setDescription(text));
    console.log("📝 New Post Created:", {
      description: text,
      image: post.image,
      category: post.category,
    });
    navigate("/welcome/profile");
    dispatch(resetPost());
  };

  return (
    <div className="relative z-0">

      {/* Background shapes */}
      <img
        className="absolute top-[-10px] right-[380px] w-[250px] hidden md:block z-0"
        src={shapeUpLogin}
        alt="shapeUpLoginAndCreate"
      />
      <img
        className="absolute bottom-0 left-[200px] w-[280px] opacity-80 hidden md:block z-0"
        src={grayShape}
        alt="Gray Shape"
      />

      
      <div className="relative z-10">

        <div className="relative z-50">
          <PcSearchBar />
          <MobileNavbar />
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden md:flex justify-center items-center min-h-screen relative">
          <div className="bg-[#303030] text-[#F9FAFB] 
          p-9 rounded-4xl max-w-[600px] w-full shadow-md relative z-10">

            <h1 className="flex justify-center font-semibold text-[30px]">
              Create your post
            </h1>

            <img src={CatSleeping} alt="CatSleeping" className="w-[35%] mt-[35px]" />

            <textarea
              placeholder="What’s your habit today? 🌟"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-[#1B1B1B] p-4 w-full h-[230px] rounded-xl border-3 
                border-transparent focus:border-[#833AFF] focus:outline-none"
            />

            {/* BUTTONS - No popup inside here */}
            <div className="flex justify-center mt-[30px] flex-wrap gap-4">

              {/* Upload Image */}
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="file-upload"
                  className={`${imagePreview ? "bg-[#3C1A86]" : "bg-[#703EDD]"} 
                    hover:bg-[#5c32b6] duration-300 p-3 rounded-[50px] w-[200px]
                    text-white font-medium text-lg shadow-md hover:shadow-lg
                    hover:scale-105 transition text-center cursor-pointer inline-block`}
                >
                  {imagePreview ? "Image Ready" : "Upload Image"}
                </label>
              </div>

              {/* Choose Category */}
              <button
                onClick={() => {
                  const isMobile = window.innerWidth < 768;
                  if (isMobile) setShowCategoryPopup(true);
                  else navigate("/select");
                }}
                className="bg-[#703EDD] hover:bg-[#5c32b6] duration-300 p-3 
                  rounded-[50px] w-[200px] text-white font-medium text-lg
                  shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
              >
                Choose Category
              </button>
            </div>

            {/* Publish */}
            <div className="flex justify-center mt-[20px]">
              <GlobalBtn text="Publish Post" type="submit" onClick={handlePublish} />
            </div>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="md:hidden flex flex-col justify-center items-start 
          min-h-screen text-[#F9FAFB] px-6 relative">

          <div className="flex justify-between items-center
           w-full absolute top-6 left-0 px-6 mt-10 z-50">
            <img src="https://i.imgur.com/7IzEEQ5.png" alt="Streaky logo" className="w-24" />
            <img
              onClick={() => navigate("/welcome/profile")}
              src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </div>

          <h1 className="font-semibold text-[26px] text-left w-full">Create your post</h1>

          <img src={CatSleeping} alt="CatSleeping" className="w-[45%] mt-[30px]" />

          <textarea
            placeholder="What’s your habit today? 🌟"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-[#1B1B1B] p-4 w-full h-[230px] rounded-xl"
          />

          
          <div className="flex items-center mt-[30px] gap-4 w-full">

     
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="file-upload"
                className={`${imagePreview ? "bg-[#3C1A86]" : "bg-[#703EDD]"} 
                  hover:bg-[#5c32b6] duration-300 p-3 rounded-[50px] w-[180px] 
                  text-white font-medium text-lg shadow-md hover:shadow-lg
                  hover:scale-105 transition text-center cursor-pointer inline-block`}
              >
                {imagePreview ? "Image Ready" : "Upload Image"}
              </label>
            </div>

            {/* Category */}
            <button
              onClick={() => setShowCategoryPopup(true)}
              className="bg-[#703EDD] hover:bg-[#5c32b6] duration-300 p-3 
                rounded-[50px] w-[50%] text-white font-medium text-lg 
                shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              Choose Category
            </button>
          </div>

          <div className="flex justify-center mt-[55px] w-full">
            <GlobalBtn text="Publish Post" type="submit" onClick={handlePublish} />
          </div>
        </div>
      </div>

 
      <CategoryPopup
        isOpen={showCategoryPopup}
        onClose={() => setShowCategoryPopup(false)}
      />

    </div>
  );
}
