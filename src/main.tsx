import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// When deployed to GitHub Pages the app is served from a subpath (e.g.
// /ekam-yoga-studio/) rather than "/". Vite bakes that subpath into
// import.meta.env.BASE_URL at build time, so the router basename derives
// from it automatically instead of hardcoding the repo name here.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
