import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";
import CreatePost from "../pages/createpost";
import LogIn from "../pages/login";
import Landing from "../pages/landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/signup";
import ProfilePage from "../pages/myprofile";
import Welcome from "../pages/welcome";

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
            element: <ProfilePage />
        },
    ],
);

export default router;
