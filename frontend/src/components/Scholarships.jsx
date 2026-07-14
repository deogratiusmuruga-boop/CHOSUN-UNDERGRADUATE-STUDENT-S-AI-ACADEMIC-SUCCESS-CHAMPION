import "../styles/Scholarships.css";

function Scholarships() {

  const scholarships = [

    {
      title: "Chosun Excellence Scholarship",
      amount: "Full Tuition",
      deadline: "20 August 2026",
      eligibility: "Undergraduate Students",
    },

    {
      title: "AI Research Internship",
      amount: "Monthly Stipend",
      deadline: "5 September 2026",
      eligibility: "Computer Engineering",
    },

    {
      title: "Global Leadership Scholarship",
      amount: "50% Tuition",
      deadline: "15 October 2026",
      eligibility: "International Students",
    },

    {
      title: "Innovation Project Grant",
      amount: "$2,000 Research Grant",
      deadline: "30 September 2026",
      eligibility: "Final Year Students",
    },

  ];

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
        />

      </div>

      <div className="scholarship-grid">

        {scholarships.map((item, index) => (

          <div
            key={index}
            className="scholarship-card"
          >

            <h2>{item.title}</h2>

            <div className="scholarship-info">

              <p><strong>💰 Funding:</strong> {item.amount}</p>

              <p><strong>📅 Deadline:</strong> {item.deadline}</p>

              <p><strong>🎯 Eligibility:</strong> {item.eligibility}</p>

            </div>

            <div className="scholarship-footer">

              View Details →

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Scholarships;