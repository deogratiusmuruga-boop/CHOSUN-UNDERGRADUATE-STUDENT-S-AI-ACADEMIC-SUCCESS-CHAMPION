import "../styles/Projects.css";

function Projects() {

  const projects = [

    {
      title: "AI Academic Assistant",
      category: "Artificial Intelligence",
      type: "Team Project",
      level: "Beginner",
      description:
        "Develop an AI-powered assistant to support students with academics.",
    },

    {
      title: "Library Management System",
      category: "Web Development",
      type: "Individual Project",
      level: "Intermediate",
      description:
        "Build a web application for managing books, borrowing and returns.",
    },

    {
      title: "Student Attendance System",
      category: "Mobile Application",
      type: "Team Project",
      level: "Intermediate",
      description:
        "Create a mobile app for recording and tracking student attendance.",
    },

    {
      title: "Smart Campus Navigation",
      category: "IoT & Mobile",
      type: "Research Project",
      level: "Advanced",
      description:
        "Design an intelligent campus navigation system using location services.",
    },

  ];

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
        />

      </div>

      <div className="projects-grid">

        {projects.map((project, index) => (

          <div
            key={index}
            className="project-card"
          >

            <h2>{project.title}</h2>

            <p className="project-description">
              {project.description}
            </p>

            <div className="project-info">

              <p><strong>🧠 Category:</strong> {project.category}</p>

              <p><strong>👥 Type:</strong> {project.type}</p>

              <p><strong>⭐ Level:</strong> {project.level}</p>

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