import { createBrowserRouter } from "react-router";
import Feed from "../pages/Feed";
import CreatePost from "../pages/Createpost";
import LogIn from "../pages/Login";
import Landing from "../pages/Landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import Welcome from "../pages/Welcome";
import SelectCategory from "../pages/SelectCategory";
import ProfilePage from "../pages/MyProfile";


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
            path: "/createPost",
            element: <CreatePost/>
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
            element: <ProfilePage />
        },
    ],
);

export default router;
