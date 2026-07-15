import React, { useState, useEffect } from "react";
import api from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (githubUrl) formData.append("github_url", githubUrl);
    if (file) formData.append("file", file);

    try {
      const res = await api.post("/projects/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProjects((prev) => [res.data, ...prev]);
      setMsg("Project uploaded successfully! / 프로젝트가 업로드되었습니다!");
      setTitle(""); setDescription(""); setCategory(""); setGithubUrl(""); setFile(null);
    } catch (err) {
      setMsg("Failed to upload project. / 프로젝트 업로드 실패.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {msg && (
        <div style={{ backgroundColor: "#dcfce7", color: "#15803d", padding: "12px 16px", borderRadius: "8px", border: "1px solid #bbf7d0", fontSize: "0.9rem" }}>
          {msg}
        </div>
      )}

      {/* Recommended Projects Banner */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: "5px solid #2563eb" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#1e293b", fontSize: "1.1rem" }}>Recommended Project / 추천 프로젝트</h3>
        {recommended.map(p => (
          <div key={p.id} style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>{p.title}</strong>
              <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "600" }}>{p.category}</span>
            </div>
            <p style={{ margin: "8px 0 0 0", color: "#475569", fontSize: "0.9rem" }}>{p.description}</p>
          </div>
        ))}
      </section>

      {/* Submit New Project Form */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.1rem" }}>Submit New Project / 새 프로젝트 등록</h3>
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <input
              placeholder="Title / 제목"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              placeholder="Category (e.g. AI, Web) / 카테고리"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <textarea
            placeholder="Description / 프로젝트 설명"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <input
            placeholder="GitHub URL / 깃허브 링크"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            style={inputStyle}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              style={{ fontSize: "0.85rem", color: "#64748b" }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.95rem",
              marginTop: "6px"
            }}
          >
            Upload Project / 업로드
          </button>
        </form>
      </section>

      {/* All Projects List */}
      <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.1rem" }}>Projects & Ideas / 프로젝트 목록</h3>
          <form onSubmit={handleFilter} style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Filter category / 카테고리 검색"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{ ...inputStyle, width: "180px", padding: "6px 12px" }}
            />
            <button type="submit" style={btnSecondaryStyle}>Filter</button>
            <button type="button" onClick={loadData} style={{ ...btnSecondaryStyle, backgroundColor: "#f1f5f9", color: "#475569" }}>Reset</button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {projects.map(p => (
            <div key={p.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1rem" }}>{p.title}</h4>
                <span style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: "6px", fontSize: "0.8rem" }}>{p.category}</span>
              </div>
              <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "0.9rem", lineHeight: "1.4" }}>{p.description}</p>
            </div>
          ))}
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
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  fontWeight: "500",
  fontSize: "0.85rem",
  cursor: "pointer"
};