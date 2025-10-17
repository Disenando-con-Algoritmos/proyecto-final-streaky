import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";
import CreatePost from "../pages/createpost";
import LoginPage from "../pages/login";
import Landing from "../pages/landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/signup";
import ProfilePage from "../pages/myprofile";

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: Landing,
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
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/signUp",
            Component: SignUp,
        },
        {
            path: "/profile",
            Component: ProfilePage,
        },
        {
            path: "/landing",
            element: <Landing/>
        },
        {
            path: "/feed",
            element: <Feed/>
        }
    ],
);

export default router;
