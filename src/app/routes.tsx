import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { StyleGuide } from "./pages/StyleGuide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/style-guide",
    Component: StyleGuide,
  },
]);
