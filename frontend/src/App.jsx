import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import MainLayout from "./layouts/MainLayout";


import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Materials from "./components/Materials";
import Resources from "./components/Resources";
import Scholarships from "./components/Scholarships";
import Projects from "./components/Projects";
import PastPapers from "./components/PastPapers";
import Login from "./components/Login";


function App() {


  return (

    <BrowserRouter>


      <Routes>


        <Route element={<MainLayout />}>


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


        </Route>


      </Routes>


    </BrowserRouter>

  );

}


export default App;