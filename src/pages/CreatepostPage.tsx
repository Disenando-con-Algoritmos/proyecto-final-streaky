import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/storeRedux/AppReducer";
import { setDescription, setImage, resetPost } from "../redux/slices/SlicePost";
import { useState, type ChangeEvent, useEffect } from "react";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import CatSleeping from "../assets/catsleeping.png";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import shapeUpLogin from "../assets/shapeUpLogin.png";
import grayShape from "../assets/grayShape.png";
import CategoryPopup from "../components/mobile/create-post/CategoryPopup";
import { getCurrentUser } from "../services/supabase/userService";
import type { UserProfile } from "../types/UserProfileType";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { supabase } from "../services/supabase/config";
import AlertPassword from "../components/desktop/AlertPassword";

export default function CreatepostPage() {
  const navigate = useNavigate();
  const [imagePreview, setimagePreview] = useState<string | null>(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post);
  const [text, setText] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      console.log("👤 Current User Data:", userData);
      if (userData) {
        setUser(userData);
      } else {
        console.warn("⚠️ No user data found. User might not be logged in.");
      }
    }
    fetchUser();
  }, []);

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

  useEffect(() => {
    if (post.description) setText(post.description);
    if (post.image) setimagePreview(post.image);
  }, [post.description, post.image]);

  const handleChooseCategory = () => {
    dispatch(setDescription(text));
    if (imagePreview) dispatch(setImage(imagePreview));
    
    const isMobile = window.innerWidth < 768;
    if (isMobile) setShowCategoryPopup(true);
    else navigate("/welcome/select");
  };

  const base64ToBlob = async (base64: string) => {
    const res = await fetch(base64);
    return await res.blob();
  };

  const uploadImage = async (base64Image: string) => {
    try {
      const blob = await base64ToBlob(base64Image);
      const fileName = `post_images/${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
      
      const { error } = await supabase.storage
        .from("streaky_bucket")
        .upload(fileName, blob);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("streaky_bucket")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handlePublish = async () => {
    if (!text.trim()) {
      setAlertMessage("You must write something!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!post.category) {
      setAlertMessage("You must choose a category!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const currentImage = imagePreview || post.image;
    if (!currentImage) {
      setAlertMessage("You must upload an image!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!user) {
      setAlertMessage("User not found. Please log in again.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      // obtwnr categoria id 
      const normalizedCategory = post.category.trim().toLowerCase();
      console.log("🔍 Searching for category:", normalizedCategory);

      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .ilike("category", `%${normalizedCategory}`)
        .single();

      if (categoryError || !categoryData) {
        console.error("Error fetching category:", categoryError);
        setAlertMessage("Invalid category selected.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      //subir i mage
      const imageUrl = await uploadImage(currentImage);
      if (!imageUrl) {
        setAlertMessage("Failed to upload image.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      //insertar el post
      const { error: insertError } = await supabase
        .from("post")
        .insert([
          {
            user_id: user.id,
            content: text,
            image: imageUrl,
            category_id: categoryData.id,
            date_created: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error("Error creating post:", insertError);
        setAlertMessage("Failed to publish post. Please try again.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      console.log("📝 New Post Created Successfully");
      dispatch(resetPost());
      navigate("/welcome/profile");
    } catch (err) {
      console.error("Unexpected error:", err);
      setAlertMessage("An unexpected error occurred.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="relative z-0">
      <AlertPassword show={showAlert} message={alertMessage} />

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

            <div className="flex justify-center mt-[30px] flex-wrap gap-4">

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

              <button
                onClick={handleChooseCategory}
                className="bg-[#703EDD] hover:bg-[#5c32b6] duration-300 p-3 
                  rounded-[50px] w-[200px] text-white font-medium text-lg
                  shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
              >
                Choose Category
              </button>
            </div>

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
            <div onClick={() => navigate("/welcome/profile")}>
              {user ? (
                <UserAvatar
                  userImage={user.userImage}
                  username={user.username}
                  size="w-12 h-12"
                  textSize="text-lg"
                />
              ) : (
                <div className="w-12 h-12 rounded-full 
                bg-[#2A2A2A] flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#B1F042] 
                  border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          <h1 className="font-semibold text-[26px] text-left w-full">Create your post</h1>

          <img src={CatSleeping} alt="CatSleeping" className="w-[45%] mt-[30px]" />

          <textarea
            placeholder="What’s your habit today? 🌟"
            value={text}
            required
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

            <button
              onClick={handleChooseCategory}
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