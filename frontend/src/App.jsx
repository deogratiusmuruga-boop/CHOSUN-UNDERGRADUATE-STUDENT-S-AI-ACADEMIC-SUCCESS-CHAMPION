import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Materials from "./components/Materials";
import Resources from "./components/Resources";
import Scholarships from "./components/Scholarships";
import Projects from "./components/Projects";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PastPapers from "./components/PastPapers";
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
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            AI Chat
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Resources
          </NavLink>

          <NavLink
            to="/scholarships"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Scholarships
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Login
          </NavLink>

        </div>

      </Navbar>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
  path="/materials"
  element={<Materials />}
/>

<Route
  path="/pastpapers"
  element={<PastPapers />}
/>
        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/scholarships"
          element={<Scholarships />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;