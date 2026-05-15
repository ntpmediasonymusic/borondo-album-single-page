import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { StyleGuide } from "./pages/StyleGuide";
import { LettersToBeele } from "./pages/LettersToBeele";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/style-guide",
    Component: StyleGuide,
  },
  {
    path: "/cartas-a-beele",
    Component: LettersToBeele,
  },
]);
