import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";
import CreatePost from "../pages/createpost";
import LoginPage from "../pages/login";
import Landing from "../pages/landing";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Feed />,
        },
        {
            path: "/createPost",
            element: <CreatePost/>
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
