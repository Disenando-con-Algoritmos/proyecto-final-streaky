import { createBrowserRouter } from "react-router";
import Feed from "../pages/feed";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Feed />,
        }
    ],
);

export default router;
