import { useEffect, useState } from "react";
import "../styles/Projects.css";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {

    fetch("http://localhost:8000/projects/")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

  }, []);


  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div className="projects-page">


      <div className="projects-header">

        <h1>💼 Student Projects</h1>

        <p>
          Explore innovative academic projects and gain practical experience.
        </p>

      </div>


      <div className="projects-search">

        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>



      <div className="projects-grid">


        {filteredProjects.map((project, index) => (


          <div
            key={index}
            className="project-card"
          >


            <h2>
              {project.title}
            </h2>


            <div className="project-info">

              <p>
                <strong>⭐ Difficulty:</strong>
                {" "}
                {project.difficulty}
              </p>


            </div>


            <div className="project-footer">

              View Project →

            </div>


          </div>


        ))}


      </div>


    </div>

  );

}


export default Projects;