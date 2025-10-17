import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Welcome from "./pages/welcome";
// import Feed from "./pages/feed";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Welcome/>
    </StrictMode>
);
