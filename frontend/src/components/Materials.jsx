import { useEffect, useState } from "react";
import "../styles/Materials.css";

function Materials() {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);


  const fetchMaterials = async () => {

    const token = localStorage.getItem("access_token");

    const response = await fetch(
      "http://localhost:8000/materials/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const data = await response.json();

    setMaterials(data);
    setLoading(false);

  };



  useEffect(() => {

    fetchMaterials();

  }, []);



  const handleUpload = async () => {

    const token = localStorage.getItem("access_token");


    if (!title || !file) {

      alert("Please provide title and file");
      return;

    }


    const formData = new FormData();

    formData.append("title", title);
    formData.append("course", course);
    formData.append("year", year);
    formData.append("file", file);



    const response = await fetch(
      "http://localhost:8000/materials/",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      }
    );


    const data = await response.json();



    if(response.ok){

      alert("Material uploaded successfully");

      setTitle("");
      setCourse("");
      setYear("");
      setFile(null);

      fetchMaterials();

    }
    else{

      alert(data.detail);

    }


  };



  return (

    <div className="materials-page">


      <div className="materials-header">

        <h1>
          📘 Academic Materials
        </h1>

        <p>
          Access lecture notes, study guides, and course resources shared by students.
        </p>

      </div>



      <div className="upload-card">


        <h2>
          Upload New Material
        </h2>



        <input
          placeholder="Material title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />


        <input
          placeholder="Course name"
          value={course}
          onChange={(e)=>setCourse(e.target.value)}
        />


        <input
          placeholder="Academic year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />



        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
        />


        <button onClick={handleUpload}>
          Upload Material
        </button>


      </div>




      <div className="materials-section">


        <h2>
          Available Materials
        </h2>



        {loading ? (

          <p>Loading materials...</p>


        ) : materials.length === 0 ? (

          <p>No materials available.</p>


        ) : (


          <div className="materials-grid">


            {materials.map((material)=>(


              <div
                className="material-card"
                key={material.id}
              >


                <div className="material-icon">
                  📄
                </div>



                <h3>
                  {material.title}
                </h3>


                <p>
                  <strong>Course:</strong>{" "}
                  {material.course || "N/A"}
                </p>


                <p>
                  <strong>Year:</strong>{" "}
                  {material.year || "N/A"}
                </p>



                <button className="open-btn">
                  Open Material
                </button>


              </div>


            ))}


          </div>


        )}



      </div>



    </div>

  );

}


export default Materials;