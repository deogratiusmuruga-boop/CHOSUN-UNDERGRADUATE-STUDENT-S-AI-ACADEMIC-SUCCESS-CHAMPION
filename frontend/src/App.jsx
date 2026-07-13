import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Resources from "./components/Resources";
import Scholarships from "./components/Scholarships";
import Projects from "./components/Projects";


function App() {

  return (

    <BrowserRouter>

      <nav>

        <Link to="/">Dashboard</Link>

        <Link to="/chat">Chat</Link>

        <Link to="/resources">Resources</Link>

        <Link to="/scholarships">Scholarships</Link>

        <Link to="/projects">Projects</Link>

      </nav>


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