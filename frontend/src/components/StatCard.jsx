function StatCard({ icon, number, title }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <h2>{number}</h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;