import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        🎓
        <div>
          <h2>AI Academic</h2>
          <span>Success Champion</span>
        </div>
      </div>

      <div className="navbar-links">

        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/chat">AI Chat</NavLink>

        <NavLink to="/resources">Resources</NavLink>

        <NavLink to="/scholarships">Scholarships</NavLink>

        <NavLink to="/projects">Projects</NavLink>

      </div>

      <div className="navbar-user">

        <div className="avatar">
          M
        </div>

        <div>

          <strong>Muruga</strong>

          <p>Student</p>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;