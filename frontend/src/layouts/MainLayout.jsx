import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layout.css";

function MainLayout() {

  return (

    <div className="app-layout">


      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          🎓
          <span>
            AI Academic<br />
            Success Champion
          </span>
        </div>


        <nav className="sidebar-menu">


          <NavLink to="/">
            🏠 Dashboard
          </NavLink>


          <NavLink to="/chat">
            🤖 AI Assistant
          </NavLink>


          <NavLink to="/resources">
            📚 Resources
          </NavLink>


          <NavLink to="/materials">
            📖 Materials
          </NavLink>


          <NavLink to="/pastpapers">
            📝 Past Papers
          </NavLink>


          <NavLink to="/scholarships">
            🎓 Scholarships
          </NavLink>


          <NavLink to="/projects">
            🚀 Projects
          </NavLink>


        </nav>


        <div className="sidebar-bottom">

          <NavLink to="/login">
            🔐 Login
          </NavLink>

        </div>


      </aside>



      {/* Main section */}
      <main className="main-section">


        <header className="top-header">

          <h2>
            AI Academic Success Champion
          </h2>


          <div className="profile">

            👤 Student

          </div>


        </header>



        <div className="page-content">

          <Outlet />

        </div>


      </main>


    </div>

  );

}


export default MainLayout;