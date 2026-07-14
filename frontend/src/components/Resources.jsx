import "../styles/Resources.css";

function Resources() {
  const resources = [
    {
      icon: "📘",
      title: "Course Notes",
      description: "Lecture notes and course materials from different subjects.",
    },
    {
      icon: "📄",
      title: "Past Examination Papers",
      description: "Practice with previous university examination papers.",
    },
    {
      icon: "📚",
      title: "Study Guides",
      description: "Well-organized study guides to help with revision.",
    },
    {
      icon: "🎥",
      title: "Video Tutorials",
      description: "Recommended educational videos for difficult topics.",
    },
  ];

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
        />

      </div>

      <div className="resources-grid">

        {resources.map((resource, index) => (

          <div
            key={index}
            className="resource-card"
          >

            <div className="resource-icon">
              {resource.icon}
            </div>

            <h2>{resource.title}</h2>

            <p>{resource.description}</p>

            <div className="resource-footer">
              <span> Open resource → </span> 
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Resources;