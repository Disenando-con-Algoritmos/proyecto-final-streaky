import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";
import CreatePost from "../pages/createpost";
import LogIn from "../pages/login";
import Landing from "../pages/Landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import ProfilePage from "../pages/myprofile";
import Welcome from "../pages/welcome";
import Habits from "../pages/habits";
import ProfileSearch from "../pages/ProfileSearch";

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
            element: <CreatePost />
        },
        {
            path: "/userSearch",
            Component: SearchPage,
        },
        {
            path: "/profile",
            element: <ProfilePage />
        },
        {
            path: "/profile/:username",
            element: <ProfileSearch />,
        },
        {
            path: "/habits",
            element: <Habits />
        },
    ],
);

export default router;
