import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Homepage from "./homepage";
import NotFound from "./not-found";

import BaselinePage from "./baseline/baseline-page";
import EditorPage from "./editor/editor-page";
import ParserPage from "./parser/parser-page";
import SolverPage from "./solver/solver-page";

const container = document.createElement("div");

if (document.body) {
  document.body.appendChild(container);
}

const router = createHashRouter([
  {
    path: "/",
    Component: Homepage,
  },
  {
    path: "/baseline",
    Component: BaselinePage,
  },
  {
    path: "/editor",
    Component: EditorPage,
  },
  {
    path: "/parser",
    Component: ParserPage,
  },
  {
    path: "/solver",
    Component: SolverPage,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
