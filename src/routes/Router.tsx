import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";
import CreatePost from "../pages/createpost";
import LogIn from "../pages/login";
import Landing from "../pages/Landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import ProfilePage from "../pages/MyProfile";
import Welcome from "../pages/welcome";
import EditProfile from "../pages/EditProfile";

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
            path: "/userSearch",
            Component: SearchPage,
        },
        {
            path: "/profile",
            Component: ProfilePage,
        },
        {
            path: "/edit-profile",
            Component: EditProfile,
        }
    ],
);

export default router;
