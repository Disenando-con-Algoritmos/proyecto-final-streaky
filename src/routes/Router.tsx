import { createBrowserRouter } from "react-router";


import Landing from "../pages/Landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import ProfilePage from "../pages/MyProfile";
import Welcome from "../pages/Welcome";
import SelectCategory from "../components/mobile/create-post/SelectCategory";
import Habits from "../pages/habits";
import ProfileSearch from "../pages/ProfileSearch";
import HabitAdded from "../pages/HabitSucces";
import EditProfile from "../pages/EditProfile";
import CreatePost from "../pages/createpost";
import LogIn from "../pages/Login";
import Feed from "../pages/Feed";



const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: Landing,
        },
        {
            path: "/signUp",
            Component: SignUp,
        },
        {
            path: "/welcome",
            Component: Welcome,
        },
        {
            path: "/login",
            Component: LogIn,
        },
        {
            path: "/feed",
            Component: Feed,
        },


                {
            path: "/select",
            Component: SelectCategory,
        },
        
        {
            path: "/userSearch",
            Component: SearchPage,
        },
        {
            path: "/profile",
            Component: ProfilePage,
        },
        {
            path: "/profile/:username",
            element: <ProfileSearch />,
        },
        {
            path: "/habits",
            element: <Habits />
        },
        {
            path: "/edit-profile",
            Component: EditProfile,
        },
       {
            path: "/createpost",
            Component: CreatePost,
        },
        {
            path: "/habitAdded",
            element: <HabitAdded/>
        },
    ],
);

export default router;
