import React, { useState, useEffect } from "react";
import api from "../api";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // Form states
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

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

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    setMsg("Submitting scholarship...");

    try {
      let formattedUrl = applicationUrl;
      if (formattedUrl && !formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
        formattedUrl = "https://" + formattedUrl;
      }

      const payload = {
        title,
        organization,
        amount: parseFloat(amount) || 0,
        deadline,
        category,
        eligibility,
        application_url: formattedUrl
      };

      const res = await api.post("/scholarships/", payload);
      
      // Update UI state immediately
      setScholarships((prev) => [res.data, ...prev]);
      setIsSuccess(true);
      setMsg("Scholarship uploaded and published successfully! / 장학금이 등록되었습니다!");

      // Reset form
      setTitle(""); setOrganization(""); setAmount(""); setDeadline(""); setCategory(""); setEligibility(""); setApplicationUrl("");
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setMsg("Failed to upload scholarship. / 장학금 등록 실패.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {msg && (
        <div style={{
          backgroundColor: isSuccess ? "#dcfce7" : "#fee2e2",
          color: isSuccess ? "#15803d" : "#b91c1c",
          padding: "12px 16px",
          borderRadius: "8px",
          border: `1px solid ${isSuccess ? "#bbf7d0" : "#fca5a5"}`,
          fontSize: "0.9rem"
        }}>
          {msg}
        </div>
      )}

      {/* Recommended Banner */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: "5px solid #16a34a" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#1e293b", fontSize: "1.1rem" }}>Recommended Scholarship / 추천 장학금</h3>
        {recommended.length > 0 ? (
          recommended.map(s => (
            <div key={s.id} style={{ backgroundColor: "#f0fdf4", padding: "14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "1.05rem", color: "#14532d" }}>{s.title}</strong>
                <span style={{ backgroundColor: "#16a34a", color: "#ffffff", padding: "2px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "700" }}>${s.amount}</span>
              </div>
              <p style={{ margin: "6px 0 0 0", color: "#166534", fontSize: "0.9rem" }}>Organization: {s.organization}</p>
              {s.application_url && (
                <a
                  href={s.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: "8px", color: "#15803d", fontWeight: "600", textDecoration: "underline", fontSize: "0.85rem" }}
                >
                  Apply Now 🔗 / 바로 가기
                </a>
              )}
            </div>
          ))
        ) : (
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>No recommendations available at the moment.</p>
        )}
      </section>

      {/* Add/Upload Scholarship Section */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.1rem" }}>Upload / Add Scholarship / 새 장학금 등록</h3>
        <form onSubmit={handleAddScholarship} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <input
              placeholder="Scholarship Title / 장학금 명칭"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              placeholder="Organization / 제공 기관"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <input
              type="number"
              placeholder="Amount ($) / 금액"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="date"
              placeholder="Deadline / 마감일"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              placeholder="Category (e.g. STEM, Merit) / 카테고리"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <input
            placeholder="Application URL Link (e.g. https://chosun.ac.kr/scholarship) / 신청 링크"
            value={applicationUrl}
            onChange={e => setApplicationUrl(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Eligibility Requirements & Details / 지원 자격 및 설명"
            value={eligibility}
            onChange={e => setEligibility(e.target.value)}
            required
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#16a34a",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.95rem",
              marginTop: "4px"
            }}
          >
            Upload Scholarship / 장학금 등록
          </button>
        </form>
      </section>

      {/* All Scholarships List */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.1rem" }}>Scholarships List / 장학금 목록</h3>
        {scholarships.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {scholarships.map(s => (
              <div key={s.id || Math.random()} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", backgroundColor: "#fafafa", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1rem" }}>{s.title}</h4>
                    <span style={{ color: "#16a34a", fontWeight: "700", fontSize: "1rem" }}>${s.amount}</span>
                  </div>
                  <p style={{ margin: "6px 0 0 0", fontSize: "0.85rem", color: "#475569" }}>Org: {s.organization}</p>
                  <div style={{ marginTop: "10px", display: "flex", gap: "10px", fontSize: "0.8rem", color: "#64748b" }}>
                    <span>📅 Deadline: {s.deadline}</span>
                    <span>•</span>
                    <span>Category: {s.category}</span>
                  </div>
                </div>

                <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #e2e8f0" }}>
                  {s.application_url ? (
                    <a
                      href={s.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none", fontSize: "0.85rem" }}
                    >
                      Apply Here 🔗 / 신청 링크
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(s.title + " scholarship")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#64748b", fontWeight: "500", textDecoration: "none", fontSize: "0.85rem" }}
                    >
                      Search Link 🔍 / 링크 검색
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>No scholarships found. Use the form above to add one!</p>
        )}
      </section>
    </div>
  );
}

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.9rem",
  outline: "none"
};