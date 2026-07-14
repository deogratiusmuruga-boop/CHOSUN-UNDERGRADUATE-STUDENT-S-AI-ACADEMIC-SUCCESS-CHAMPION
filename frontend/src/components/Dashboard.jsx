import { Link } from "react-router-dom";
import StatCard from "./StatCard";
import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">

      {/* Hero Section */}

      <div className="hero">

        <h1>
          🎓 Undergraduate Success Champion
        </h1>

        <p>
          Your intelligent companion for learning, academic resources,
          scholarships, projects and AI-powered assistance for excellent performance.
        </p>

        <Link to="/chat" className="hero-button">
          Start AI Chat →
        </Link>

      </div>

      <div className="stat-grid">

  <StatCard
    icon="🤖"
    number="24"
    title="AI Conversations"
  />

  <StatCard
    icon="📚"
    number="125"
    title="Resources"
  />

  <StatCard
    icon="🎓"
    number="18"
    title="Scholarships"
  />

  <StatCard
    icon="💡"
    number="40"
    title="Projects"
  />

</div>


      {/* Feature Cards */}

      <div className="cards">

        <Link to="/chat" className="card">

          <h2>🤖 AI Chat</h2>

          <p>
            Ask academic questions and receive AI-powered assistance.
          </p>

        </Link>


        <Link to="/resources" className="card">

          <h2>📚 Resources</h2>

          <p>
            Access notes, tutorials, revision materials and study guides.
          </p>

        </Link>


        <Link to="/scholarships" className="card">

          <h2>🎓 Scholarships</h2>

          <p>
            Discover scholarships, internships and funding opportunities.
          </p>

        </Link>


        <Link to="/projects" className="card">

          <h2>💡 Student Projects</h2>

          <p>
            Explore innovative project ideas and build your portfolio.
          </p>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;