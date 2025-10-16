import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SearchPage from "./pages/SearchPage";
// import Post from "./components/mobile/feed/Post";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SearchPage />
    </StrictMode>
);
