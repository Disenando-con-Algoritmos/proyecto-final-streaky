import { createBrowserRouter } from "react-router";
import Feed from "../pages/Feed";
import CreatePost from "../pages/CreatePost";
import LoginPage from "../pages/login";
import Landing from "../pages/landing";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter(
    [
        {
            path: "/",
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
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "landing",
            element: <Landing/>
        }
    ],
);

export default router;
