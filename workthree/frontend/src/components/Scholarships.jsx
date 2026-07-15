import React, { useState, useEffect } from "react";
import api from "../api";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, rRes] = await Promise.all([
          api.get("/scholarships/"),
          api.get("/scholarships/recommend")
        ]);
        setScholarships(sRes.data);
        setRecommended(rRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Recommended Scholarship Banner */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: "5px solid #16a34a" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#1e293b", fontSize: "1.1rem" }}>Recommended Scholarship / 추천 장학금</h3>
        {recommended.map(s => (
          <div key={s.id} style={{ backgroundColor: "#f0fdf4", padding: "14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.05rem", color: "#14532d" }}>{s.title}</strong>
              <span style={{ backgroundColor: "#16a34a", color: "#ffffff", padding: "2px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "700" }}>${s.amount}</span>
            </div>
            <p style={{ margin: "6px 0 0 0", color: "#166534", fontSize: "0.9rem" }}>Organization: {s.organization}</p>
          </div>
        ))}
      </section>

      {/* All Scholarships List */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.1rem" }}>Scholarships List / 장학금 목록</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {scholarships.map(s => (
            <div key={s.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1rem" }}>{s.title}</h4>
                <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "1rem" }}>${s.amount}</span>
              </div>
              <div style={{ marginTop: "12px", display: "flex", gap: "10px", fontSize: "0.8rem", color: "#64748b" }}>
                <span>📅 Deadline: {s.deadline}</span>
                <span>•</span>
                <span>Category: {s.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}