import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <div className="logo">
        🎓
        <h2>Academic AI</h2>
      </div>


      <nav>

        <Link to="/">
          🏠 Dashboard
        </Link>


        <Link to="/chat">
          🤖 AI Assistant
        </Link>


        <Link to="/resources">
          📚 Resources
        </Link>


        <Link to="/pastpapers">
          📝 Past Papers
        </Link>


        <Link to="/scholarships">
          🎓 Scholarships
        </Link>


        <Link to="/projects">
          🚀 Projects
        </Link>


      </nav>


      <div className="sidebar-footer">

        <p>
          AI Academic
          <br/>
          Success Companion
        </p>

      </div>


    </div>

  );

}


export default Sidebar;