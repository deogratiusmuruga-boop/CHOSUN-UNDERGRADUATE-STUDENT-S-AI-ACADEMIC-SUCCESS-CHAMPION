import React, { useState, useEffect } from "react";
import api from "../api";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Recommended Scholarship Banner */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: "5px solid #16a34a" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#1e293b", fontSize: "1.1rem" }}>
          ⭐ Recommended Scholarships for You / 맞춤 추천 장학금
        </h3>
        {recommended.map(s => (
          <div key={s.id || Math.random()} style={{ backgroundColor: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.05rem", color: "#14532d" }}>{s.title}</strong>
              <span style={{ backgroundColor: "#16a34a", color: "#ffffff", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "700" }}>${s.amount}</span>
            </div>
            <p style={{ margin: "6px 0 0 0", color: "#166534", fontSize: "0.9rem" }}>Organization / 제공 기관: {s.organization}</p>
            {s.application_url && (
              <a
                href={s.application_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "10px", color: "#ffffff", backgroundColor: "#16a34a", padding: "6px 14px", borderRadius: "6px", fontWeight: "600", textDecoration: "none", fontSize: "0.85rem" }}
              >
                Apply Directly 🔗 / 즉시 신청하기
              </a>
            )}
          </div>
        ))}
      </section>

      {/* Main Student Browse Feed */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "1.2rem" }}>Scholarship Listings & Opportunities / 전체 장학금 목록 및 공모</h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "#64748b" }}>Find eligible funding and apply online / 신청 자격 확인 및 온라인 지원</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {scholarships.map(s => (
            <div key={s.id || Math.random()} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", backgroundColor: "#fafafa", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1.05rem" }}>{s.title}</h4>
                  <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "1.1rem" }}>${s.amount}</span>
                </div>
                <p style={{ margin: "6px 0 0 0", fontSize: "0.85rem", color: "#475569" }}>Organization / 기관: {s.organization}</p>
                <div style={{ marginTop: "10px", display: "flex", gap: "10px", fontSize: "0.8rem", color: "#64748b" }}>
                  <span>📅 Deadline / 마감: {s.deadline}</span>
                  <span>•</span>
                  <span>Category / 분류: {s.category}</span>
                </div>
              </div>

              <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #e2e8f0" }}>
                {s.application_url ? (
                  <a
                    href={s.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none", fontSize: "0.85rem", display: "inline-block" }}
                  >
                    Apply Now 🔗 / 신청 바로가기
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(s.title + " scholarship")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#64748b", fontWeight: "500", textDecoration: "none", fontSize: "0.85rem", display: "inline-block" }}
                  >
                    Search Details 🔍 / 정보 검색
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}