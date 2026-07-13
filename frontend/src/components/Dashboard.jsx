import { Link } from "react-router-dom";


function Dashboard() {

  return (

    <div className="dashboard">

      <h1>
        Student AI Dashboard
      </h1>


      <p>
        Welcome to your AI-powered learning assistant.
      </p>


      <div className="cards">


        <Link to="/chat" className="card">

          <h2>
            AI Chat Assistant
          </h2>

          <p>
            Ask questions and get personalized study help.
          </p>

        </Link>



        <Link to="/resources" className="card">

          <h2>
            Academic Resources
          </h2>

          <p>
            Access notes, revision materials, and past papers.
          </p>

        </Link>



        <Link to="/scholarships" className="card">

          <h2>
            Scholarships
          </h2>

          <p>
            Discover scholarships and internship opportunities.
          </p>

        </Link>



        <Link to="/projects" className="card">

          <h2>
            Student Projects
          </h2>

          <p>
            Explore project ideas and portfolio resources.
          </p>

        </Link>


      </div>


    </div>

  );

}


export default Dashboard;