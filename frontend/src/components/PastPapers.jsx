import { useEffect, useState } from "react";
import "../styles/PastPapers.css";


function PastPapers() {


  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);


  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);



  const fetchPapers = async () => {


    const token = localStorage.getItem("access_token");


    const response = await fetch(
      "http://localhost:8000/pastpapers/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const data = await response.json();


    console.log("Past Papers:", data);


    if(response.ok){

      setPapers(data);

    }
    else{

      alert(data.detail);

    }


    setLoading(false);


  };




  useEffect(() => {

    fetchPapers();

  }, []);






  const handleUpload = async () => {


    const token = localStorage.getItem("access_token");


    if(!title || !file){

      alert("Please provide title and file");
      return;

    }



    const formData = new FormData();


    formData.append("title", title);
    formData.append("course", course);
    formData.append("year", year);
    formData.append("file", file);



    const response = await fetch(
      "http://localhost:8000/pastpapers/",
      {

        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,

      }
    );



    const data = await response.json();


    console.log("Upload:", data);



    if(response.ok){

      alert("Past paper uploaded successfully");


      setTitle("");
      setCourse("");
      setYear("");
      setFile(null);


      fetchPapers();


    }
    else{

      alert(data.detail);

    }


  };





  return (

    <div className="pastpapers-page">


      <div className="pastpapers-header">


        <h1>
          📄 Past Papers
        </h1>


        <p>
          Practice with previous examinations and improve your academic preparation.
        </p>


      </div>




      <div className="upload-card">


        <h2>
          Upload Past Paper
        </h2>



        <input
          placeholder="Paper title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />



        <input
          placeholder="Course"
          value={course}
          onChange={(e)=>setCourse(e.target.value)}
        />



        <input
          placeholder="Year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />



        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
        />



        <button onClick={handleUpload}>
          Upload Past Paper
        </button>



      </div>





      <div className="papers-section">


        <h2>
          Available Past Papers
        </h2>



        {
          loading ? (

            <p>
              Loading...
            </p>


          ) : papers.length === 0 ? (

            <p>
              No past papers available.
            </p>


          ) : (


            <div className="papers-grid">


              {
                papers.map((paper)=>(


                  <div
                    key={paper.id}
                    className="paper-card"
                  >


                    <div className="paper-icon">
                      📝
                    </div>



                    <h3>
                      {paper.title}
                    </h3>



                    <p>
                      Course: {paper.course || "N/A"}
                    </p>


                    <p>
                      Year: {paper.year || "N/A"}
                    </p>



                    <button>
                      Open Paper
                    </button>



                  </div>


                ))
              }


            </div>


          )

        }



      </div>



    </div>

  );


}


export default PastPapers;