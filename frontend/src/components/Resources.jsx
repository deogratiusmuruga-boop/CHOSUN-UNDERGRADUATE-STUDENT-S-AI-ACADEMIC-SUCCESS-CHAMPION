import { useEffect, useState } from "react";
import "../styles/Resources.css";

function Resources() {

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/resources/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("Backend Response:", data);

        if (!response.ok) {
          throw new Error(data.detail || "Failed to load resources");
        }

        return data;

      })
      .then((data) => {

        setResources(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error(error);
        setLoading(false);

      });

  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.title?.toLowerCase().includes(search.toLowerCase())
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

      ) : filteredResources.length === 0 ? (

        <h3>No resources available.</h3>

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

              <h2>{resource.title}</h2>

              <p>
                Course: {resource.course || "N/A"}
              </p>

              <p>
                Type: {resource.type}
              </p>

              <p>
                Year: {resource.year || "N/A"}
              </p>

              <div className="resource-footer">
                <span>Open resource →</span>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Resources;