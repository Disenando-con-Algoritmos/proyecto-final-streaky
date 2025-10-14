import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import "./index.css";
import Post from "./components/mobile/feed/Post";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Post/>
=======

import "./App.css";
import PcSearchBar from "./components/pc/PcSearchBar";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PcSearchBar/>
>>>>>>> ca8940ffd89abb755735ce4257ff2ebbfd4b418d
    </StrictMode>
);
