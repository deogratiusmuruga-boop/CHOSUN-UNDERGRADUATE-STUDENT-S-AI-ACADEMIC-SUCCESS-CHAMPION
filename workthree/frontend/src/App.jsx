import React, { useState } from 'react';
import Projects from './components/Projects';
import Scholarships from './components/Scholarships';

export default function App() {
  const [tab, setTab] = useState('projects');

  return (
    <div>
      <nav style={{ padding: '15px', background: '#222', color: '#fff', display: 'flex', gap: '15px' }}>
        <button onClick={() => setTab('projects')}>Projects & Ideas</button>
        <button onClick={() => setTab('scholarships')}>Scholarships</button>
      </nav>
      {tab === 'projects' ? <Projects /> : <Scholarships />}
    </div>
  );
}
