import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ClassesPage } from "./pages/ClassesPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { StylesOfYogaPage } from "./pages/StylesOfYogaPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="styles-of-yoga" element={<StylesOfYogaPage />} />
        <Route path="events/:slug" element={<EventDetailPage />} />
      </Route>
    </Routes>
  );
}
