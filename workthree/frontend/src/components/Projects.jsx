import React, { useState, useEffect } from "react";
import api from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pRes, rRes] = await Promise.all([
        api.get("/projects/"),
        api.get("/projects/recommend")
      ]);
      setProjects(pRes.data);
      setRecommended(rRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const url = categoryFilter ? "/projects/?category=" + categoryFilter : "/projects/";
    const res = await api.get(url);
    setProjects(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMsg("Uploading project... / 프로젝트 등록 중...");

    try {
      let formatLive = liveUrl;
      if (formatLive && !formatLive.startsWith("http://") && !formatLive.startsWith("https://")) {
        formatLive = "https://" + formatLive;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (githubUrl) formData.append("github_url", githubUrl);
      if (formatLive) formData.append("live_url", formatLive);
      if (file) formData.append("file", file);

      const res = await api.post("/projects/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setProjects((prev) => [res.data, ...prev]);
      setIsSuccess(true);
      setMsg("Project submitted successfully! / 프로젝트가 성공적으로 제출되었습니다!");
      setTitle(""); setDescription(""); setCategory(""); setGithubUrl(""); setLiveUrl(""); setFile(null);
      setShowSubmitForm(false);
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setMsg("Submission failed. / 제출 실패.");
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    if (filePath.startsWith("http")) return filePath;
    const fileName = filePath.split(/[\\/]/).pop();
    return `http://localhost:8000/uploads/${fileName}`;
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
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: "5px solid #2563eb" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#1e293b", fontSize: "1.1rem" }}>
          ⭐ Recommended Student Projects / 추천 학생 프로젝트
        </h3>
        {recommended.map(p => (
          <div key={p.id || Math.random()} style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>{p.title}</strong>
              <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "600" }}>{p.category}</span>
            </div>
            <p style={{ margin: "8px 0 0 0", color: "#475569", fontSize: "0.9rem" }}>{p.description}</p>
          </div>
        ))}
      </section>

      {/* Main Student Project Feed */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.2rem" }}>Project Gallery & Ideas / 프로젝트 갤러리 및 아이디어</h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "#64748b" }}>Explore student work, portfolios, and research / 학생 작품 및 연구 포트폴리오 탐색</p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              style={{
                backgroundColor: showSubmitForm ? "#64748b" : "#2563eb",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              {showSubmitForm ? "✖ Close / 닫기" : "➕ Submit Project / 프로젝트 제출"}
            </button>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <form onSubmit={handleFilter} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <input
            placeholder="Search category (e.g. AI, Web) / 카테고리 검색"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button type="submit" style={btnSecondaryStyle}>Search / 검색</button>
          <button type="button" onClick={loadData} style={{ ...btnSecondaryStyle, backgroundColor: "#f1f5f9", color: "#475569" }}>Reset / 초기화</button>
        </form>

        {/* Collapsible Student Submission Form */}
        {showSubmitForm && (
          <div style={{ backgroundColor: "#f8fafc", borderRadius: "10px", padding: "20px", marginBottom: "20px", border: "1px solid #cbd5e1" }}>
            <h4 style={{ margin: "0 0 14px 0", color: "#0f172a" }}>Submit Your Project / 프로젝트 제출하기</h4>
            <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input placeholder="Project Title / 프로젝트 제목" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
                <input placeholder="Category (e.g. AI, Web) / 카테고리" value={category} onChange={e => setCategory(e.target.value)} required style={inputStyle} />
              </div>
              <textarea placeholder="Description / 프로젝트 설명" value={description} onChange={e => setDescription(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input placeholder="Live Site Link / 라이브 사이트 (https://...)" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} style={inputStyle} />
                <input placeholder="GitHub Link / 깃허브 링크" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569" }}>Attach Zip / PDF File / 첨부 파일:</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} style={{ display: "block", marginTop: "4px", fontSize: "0.85rem" }} />
              </div>
              <button type="submit" style={{ backgroundColor: "#16a34a", color: "#fff", padding: "10px", borderRadius: "6px", border: "none", fontWeight: "600", cursor: "pointer" }}>
                Confirm Submission / 제출 완료
              </button>
            </form>
          </div>
        )}

        {/* Project Display Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {projects.map(p => {
            const uploadedFileUrl = getFileUrl(p.file_path);
            return (
              <div key={p.id || Math.random()} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", backgroundColor: "#fafafa" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1.05rem" }}>{p.title}</h4>
                  <span style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "3px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}>{p.category}</span>
                </div>
                <p style={{ margin: "10px 0 12px 0", color: "#475569", fontSize: "0.9rem", lineHeight: "1.5" }}>{p.description}</p>
                
                <div style={{ display: "flex", gap: "10px", paddingTop: "12px", borderTop: "1px solid #e2e8f0", flexWrap: "wrap", alignItems: "center" }}>
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#16a34a", color: "#ffffff", padding: "6px 14px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "600" }}>
                      🌐 Live Site / 라이브 사이트
                    </a>
                  )}

                  {uploadedFileUrl && (
                    <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" download style={{ backgroundColor: "#0284c7", color: "#ffffff", padding: "6px 14px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "600" }}>
                      📁 View File / 첨부파일 다운로드
                    </a>
                  )}

                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "6px 14px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "600" }}>
                      💻 GitHub Repo / 깃허브
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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

const btnSecondaryStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  fontWeight: "500",
  fontSize: "0.85rem",
  cursor: "pointer"
};