import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pRes, rRes] = await Promise.all([
        api.get('/projects/'),
        api.get('/projects/recommend')
      ]);
      setProjects(pRes.data);
      setRecommended(rRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const url = categoryFilter ? \/projects/?category=\\ : '/projects/';
    const res = await api.get(url);
    setProjects(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (githubUrl) formData.append('github_url', githubUrl);
    if (file) formData.append('file', file);

    try {
      const res = await api.post('/projects/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjects((prev) => [res.data, ...prev]);
      setMsg('Project uploaded successfully!');
      setTitle(''); setDescription(''); setCategory(''); setGithubUrl(''); setFile(null);
    } catch (err) {
      setMsg('Failed to upload project.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Member 3: Projects Module</h2>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      <div style={{ background: '#f0f4f8', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3> Recommended Project</h3>
        {recommended.map(p => (
          <div key={p.id}><strong>{p.title}</strong> - {p.category}<p>{p.description}</p></div>
        ))}
      </div>

      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <h3>Submit New Project</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload Project</button>
      </form>

      <h3>All Projects</h3>
      <form onSubmit={handleFilter} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input placeholder="Filter category" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} />
        <button type="submit">Filter</button>
        <button type="button" onClick={loadData}>Reset</button>
      </form>

      {projects.map(p => (
        <div key={p.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h4>{p.title} ({p.category})</h4>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
