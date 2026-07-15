import { useEffect, useState } from "react";
import "../styles/Scholarships.css";


function Scholarships() {


  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const token = localStorage.getItem("access_token");



    fetch(
      "http://localhost:8000/scholarships/",
      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }
    )


    .then(async(response)=>{


      const data = await response.json();


      console.log(
        "Scholarships:",
        data
      );



      if(response.ok){

        setScholarships(data);

      }
      else{

        alert(data.detail);

      }



      setLoading(false);



    })


    .catch((error)=>{


      console.error(
        "Error loading scholarships:",
        error
      );


      setLoading(false);



    });



  }, []);





  const filteredScholarships =
    scholarships.filter((item)=>

      item.title
      .toLowerCase()
      .includes(search.toLowerCase())

    );






  return (

    <div className="scholarship-page">


      <div className="scholarship-header">


        <h1>
          🎓 Scholarships & Opportunities
        </h1>


        <p>
          Discover scholarships, grants and opportunities to support your academic journey.
        </p>


      </div>




      <div className="scholarship-search">


        <input

          type="text"

          placeholder="🔍 Search scholarships..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />


      </div>





      {
        loading ? (

          <h3>
            Loading scholarships...
          </h3>


        ) : filteredScholarships.length === 0 ? (

          <h3>
            No scholarships available.
          </h3>


        ) : (



          <div className="scholarship-grid">



          {
            filteredScholarships.map((item)=>(


              <div
                className="scholarship-card"
                key={item.id}
              >



                <div className="scholarship-icon">

                  🎓

                </div>



                <h2>

                  {item.title}

                </h2>



                <p>

                  <strong>
                    Field:
                  </strong>

                  {" "}

                  {item.field || "General"}

                </p>




                <p>

                  <strong>
                    Deadline:
                  </strong>

                  {" "}

                  {item.deadline || "Not specified"}

                </p>




                <p>

                  {item.description}

                </p>




                {
                  item.link && (

                    <a
                      href={item.link}
                      target="_blank"
                    >

                      View Details →

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


export default Scholarships;