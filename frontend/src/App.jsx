import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Resources from "./components/Resources";
import Scholarships from "./components/Scholarships";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>

      <Navbar>

        <div className="logo">
          🎓 AI Academic Success Champion
        </div>

        <div className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            AI Chat
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Resources
          </NavLink>

          <NavLink
            to="/scholarships"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Scholarships
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Projects
          </NavLink>

        </div>

      </Navbar>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;