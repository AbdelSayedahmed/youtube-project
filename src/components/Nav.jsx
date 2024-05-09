import { Link } from "react-router-dom";
import Filter from "./Filter";
import "./Nav.css";

export default function Nav({ handleFilter }) {
  return (
    <div className="nav-container">
      <div className="nav-container_left">
        <Link to="/home" className="nav-container_link">
          <img src="/src/assets/youtubelogo.png" alt="Home" id="youtubelogo" />
        </Link>
        <Filter handleFilter={handleFilter} />
      </div>
      <div className="nav-container_right">
        <Link to="/About" className="nav-container_link">
          About
        </Link>
      </div>
    </div>
  );
}
