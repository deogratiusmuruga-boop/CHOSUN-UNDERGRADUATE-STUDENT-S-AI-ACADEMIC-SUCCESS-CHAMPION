import { useEffect, useState } from "react";
import "../styles/Scholarships.css";

function Scholarships() {

  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("http://localhost:8000/scholarships/")
      .then((response) => response.json())
      .then((data) => {

        setScholarships(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error("Error loading scholarships:", error);
        setLoading(false);

      });

  }, []);



  const filteredScholarships = scholarships.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (

    <div className="scholarship-page">


      <div className="scholarship-header">

        <h1>🎓 Scholarships & Opportunities</h1>

        <p>
          Discover scholarships, grants and internship opportunities.
        </p>

      </div>



      <div className="scholarship-search">

        <input
          type="text"
          placeholder="🔍 Search scholarships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>



      {loading ? (

        <h3>Loading scholarships...</h3>

      ) : (


        <div className="scholarship-grid">


          {filteredScholarships.map((item, index) => (


            <div
              key={index}
              className="scholarship-card"
            >


              <h2>
                {item.title}
              </h2>



              <div className="scholarship-info">

                <p>
                  <strong>📅 Deadline:</strong>
                  {" "}
                  {item.deadline}
                </p>


              </div>



              <div className="scholarship-footer">

                View Details →

              </div>


            </div>


          ))}


        </div>


      )}



    </div>

  );

}


export default Scholarships;