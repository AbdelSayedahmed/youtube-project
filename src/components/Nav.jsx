import { Link } from "react-router-dom";
import "/src/components/Nav.css";

export default function Nav() {
  return (
    <div className="nav-container">
      <Link to="/home" className="nav-container_link">
        <img src="/src/assets/youtubelogo.png" alt="Home" id="youtubelogo" />
      </Link>
      <Link to="/About" className="nav-container_link">
        About
      </Link>
    </div>
  );
}
