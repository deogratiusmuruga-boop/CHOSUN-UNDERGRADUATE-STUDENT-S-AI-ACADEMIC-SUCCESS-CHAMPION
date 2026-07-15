import { useEffect, useState } from "react";
import "../styles/Projects.css";


function Projects() {


  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);




  useEffect(() => {


    const token = localStorage.getItem("access_token");



    fetch(
      "http://localhost:8000/projects/",
      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    )


    .then(async(response)=>{


      const data = await response.json();


      console.log(
        "Projects:",
        data
      );



      if(response.ok){

        setProjects(data);

      }
      else{

        alert(data.detail);

      }


      setLoading(false);



    })


    .catch((error)=>{


      console.error(
        "Error loading projects:",
        error
      );


      setLoading(false);


    });



  }, []);






  const filteredProjects = projects.filter((project)=>

    project.title
      .toLowerCase()
      .includes(search.toLowerCase())

  );






  return (

    <div className="projects-page">



      <div className="projects-header">


        <h1>
          🚀 Student Projects
        </h1>


        <p>
          Explore academic, research, and innovation projects.
        </p>


      </div>





      <div className="projects-search">


        <input

          type="text"

          placeholder="🔍 Search projects..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />


      </div>





      {
        loading ? (

          <h3>
            Loading projects...
          </h3>


        ) : filteredProjects.length === 0 ? (

          <h3>
            No projects available.
          </h3>


        ) : (


          <div className="projects-grid">


          {
            filteredProjects.map((project)=>(


              <div

                key={project.id}

                className="project-card"

              >



                <div className="project-icon">

                  🚀

                </div>



                <h2>

                  {project.title}

                </h2>




                <p>

                  <strong>
                    Category:
                  </strong>

                  {" "}

                  {project.category || "General"}

                </p>





                <p>

                  {project.description}

                </p>





                {
                  project.link && (

                    <a

                      href={project.link}

                      target="_blank"

                    >

                      View Project →

                    </a>

                  )

                }



              </div>



            ))
          }



          </div>


        )


      }



    </div>

  );


}


export default Projects;