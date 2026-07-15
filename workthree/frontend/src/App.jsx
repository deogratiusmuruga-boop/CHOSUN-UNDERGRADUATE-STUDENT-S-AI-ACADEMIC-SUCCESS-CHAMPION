import React, { useState } from "react";
import Projects from "./components/Projects";
import Scholarships from "./components/Scholarships";

export default function App() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", backgroundColor: "#f1f5f9", minHeight: "100vh", color: "#1e293b" }}>
      {/* Header Bar */}
      <header style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "1.5rem 2rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "700" }}>Academic Success Portal</h1>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.875rem", color: "#94a3b8" }}>
              Project & Scholarship Recommendation Hub / 프로젝트 및 장학금 추천 허브
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{ maxWidth: "1000px", margin: "25px auto 0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: "12px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
          <button
            onClick={() => setActiveTab("projects")}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.2s",
              backgroundColor: activeTab === "projects" ? "#2563eb" : "transparent",
              color: activeTab === "projects" ? "#ffffff" : "#64748b"
            }}
          >
            Projects & Ideas / 프로젝트
          </button>
          <button
            onClick={() => setActiveTab("scholarships")}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.2s",
              backgroundColor: activeTab === "scholarships" ? "#16a34a" : "transparent",
              color: activeTab === "scholarships" ? "#ffffff" : "#64748b"
            }}
          >
            Scholarships / 장학금
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        {activeTab === "projects" ? <Projects /> : <Scholarships />}
      </main>
    </div>
  );
}