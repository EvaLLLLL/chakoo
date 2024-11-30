import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import "@repo/ui/dist/index.css";
import App from "./App";
import Providers from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
