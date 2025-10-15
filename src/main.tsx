import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import PcSearchBar from "./components/pc/PcSearchBar";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PcSearchBar cardIndividuals={cardIndividual}/>
    </StrictMode>
);
