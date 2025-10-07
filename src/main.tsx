import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./App.css";
import PcSearchBar from "./components/pc/PcSearchBar";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PcSearchBar/>
    </StrictMode>
);
