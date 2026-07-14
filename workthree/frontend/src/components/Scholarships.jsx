import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, rRes] = await Promise.all([
          api.get('/scholarships/'),
          api.get('/scholarships/recommend')
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Member 3: Scholarships Module</h2>
      <div style={{ background: '#eefcf2', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3> Recommended Scholarship</h3>
        {recommended.map(s => (
          <div key={s.id}><strong>{s.title}</strong> - \<p>Org: {s.organization}</p></div>
        ))}
      </div>

      <h3>All Scholarships</h3>
      {scholarships.map(s => (
        <div key={s.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <h4>{s.title} (\)</h4>
          <p>Deadline: {s.deadline} | Category: {s.category}</p>
        </div>
      ))}
    </div>
  );
}
