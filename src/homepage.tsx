import { Link } from "react-router-dom";

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

export default Homepage;
