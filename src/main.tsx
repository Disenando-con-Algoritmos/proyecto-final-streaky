import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MobileNavbar from "./components/mobile/nav-bar/MobileNavBar";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MobileNavbar/>
    </StrictMode>
);
