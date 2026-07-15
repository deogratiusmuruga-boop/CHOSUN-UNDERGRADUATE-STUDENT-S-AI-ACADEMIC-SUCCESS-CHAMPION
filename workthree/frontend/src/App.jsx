import React, { useState } from "react";
import Projects from "./components/Projects";
import Scholarships from "./components/Scholarships";

export default function App() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Navigation Bar / 상단 네비게이션 */}
      <header style={{ backgroundColor: "#1e293b", color: "#ffffff", padding: "1rem 2rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>?? Work Three: Academic Success Portal</h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem", color: "#94a3b8" }}>
          Project & Scholarship Recommendation Hub / 프로젝트 및 장학금 추천 허브
        </p>
      </header>

      {/* Tabs / 탭 버튼 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={() => setActiveTab("projects")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: activeTab === "projects" ? "#2563eb" : "#e2e8f0",
            color: activeTab === "projects" ? "#ffffff" : "#334155"
          }}
        >
          ?? Projects & Ideas / 프로젝트
        </button>
        <button
          onClick={() => setActiveTab("scholarships")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: activeTab === "scholarships" ? "#16a34a" : "#e2e8f0",
            color: activeTab === "scholarships" ? "#ffffff" : "#334155"
          }}
        >
          ?? Scholarships / 장학금
        </button>
      </div>

      {/* Main Content Area / 메인 콘텐츠 */}
      <main style={{ padding: "20px" }}>
        {activeTab === "projects" ? <Projects /> : <Scholarships />}
      </main>
    </div>
  );
}
