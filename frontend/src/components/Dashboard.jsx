import "./../styles/Dashboard.css";

function Dashboard() {

  return (

    <div className="dashboard">


      {/* Welcome Section */}

      <div className="welcome-card">

        <div>

          <h1>
            Welcome back, Student 👋
          </h1>

          <p>
            Your AI Academic Success Champion is ready
            to help you improve your learning journey.
          </p>

        </div>


        <div className="ai-icon">
          🤖
        </div>

      </div>



      {/* Statistics */}

      <div className="stats-grid">


        <div className="stat-card">

          <h3>
            GPA Progress
          </h3>

          <h2>
            3.8 / 4.5
          </h2>

          <p>
            Keep improving your academic performance.
          </p>

        </div>



        <div className="stat-card">

          <h3>
            AI Conversations
          </h3>

          <h2>
            24
          </h2>

          <p>
            Questions solved with AI Assistant.
          </p>

        </div>



        <div className="stat-card">

          <h3>
            Resources
          </h3>

          <h2>
            120+
          </h2>

          <p>
            Learning materials available.
          </p>

        </div>


      </div>




      {/* Quick Actions */}

      <h2 className="section-title">
        Quick Actions
      </h2>


      <div className="action-grid">


        <div className="action-card">

          <span>
            🤖
          </span>

          <h3>
            Ask AI Assistant
          </h3>

          <p>
            Get help with coursework and academic questions.
          </p>

        </div>



        <div className="action-card">

          <span>
            📚
          </span>

          <h3>
            Study Materials
          </h3>

          <p>
            Access notes, books and learning resources.
          </p>

        </div>




        <div className="action-card">

          <span>
            🎓
          </span>

          <h3>
            Scholarships
          </h3>

          <p>
            Discover opportunities for students.
          </p>

        </div>



      </div>



      {/* Recent Activity */}

      <div className="activity-card">

        <h2>
          Recent Activity
        </h2>


        <ul>

          <li>
            🤖 Asked AI about GPA improvement
          </li>

          <li>
            📚 Viewed Machine Learning materials
          </li>

          <li>
            🎓 Checked scholarship opportunities
          </li>


        </ul>


      </div>



    </div>

  );

}


export default Dashboard;