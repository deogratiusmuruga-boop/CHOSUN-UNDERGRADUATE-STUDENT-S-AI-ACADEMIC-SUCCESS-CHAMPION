import { useEffect, useState } from "react";
import "../styles/Resources.css";

function Resources() {

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("http://localhost:8000/resources/")
      .then((response) => response.json())
      .then((data) => {

  console.log("RESOURCES FROM BACKEND:", data);

  setResources(data);
  setLoading(false);

})
      
      .catch((error) => {
        console.error("Error loading resources:", error);
        setLoading(false);
      });

  }, []);



  const filteredResources = resources.filter((resource) =>
    resource.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (

    <div className="resources-page">


      <div className="resources-header">

        <h1>📚 Academic Resources</h1>

        <p>
          Find learning materials to improve your academic performance.
        </p>

      </div>



      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>



      {loading ? (

        <h3>Loading resources...</h3>

      ) : (


        <div className="resources-grid">


          {filteredResources.map((resource) => (


            <div
              key={resource.id}
              className="resource-card"
            >


              <div className="resource-icon">
                📘
              </div>



              <h2>
                {resource.title}
              </h2>



              <p>
                Course: {resource.course}
              </p>



              <div className="resource-footer">

                <span>
                  Open resource →
                </span>

              </div>


            </div>


          ))}


        </div>


      )}



    </div>

  );

}


export default Resources;