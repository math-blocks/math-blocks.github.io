import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider, Link } from "react-router-dom";

import BaselinePage from "./baseline/baseline-page";
import EditorPage from "./editor/editor-page";
import ParserPage from "./parser/parser-page";
import SolverPage from "./solver/solver-page";

const container = document.createElement("div");

if (document.body) {
  document.body.appendChild(container);
}

const Homepage = () => {
  return (
    <div>
      <h1>MathBlocks Demos</h1>
      <ul>
        <li>
          <Link to="/baseline">Baseline</Link>
        </li>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
        <li>
          <Link to="/parser">Parser</Link>
        </li>
        <li>
          <Link to="/solver">Solver</Link>
        </li>
      </ul>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>404: Not Found</h1>
    </div>
  );
};

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
