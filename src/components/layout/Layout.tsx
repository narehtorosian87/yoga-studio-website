import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * React Router doesn't scroll to a URL's #hash the way a plain browser
 * navigation does, so a link like /classes#private-sessions would land
 * at the top of the page instead of the section. This scrolls to the
 * matching element once the new page has rendered.
 */
function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    const id = hash.slice(1);
    const target = document.getElementById(id);
    // jsdom (used by the test suite) doesn't implement scrollIntoView.
    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);
}

export function Layout() {
  useScrollToHash();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
