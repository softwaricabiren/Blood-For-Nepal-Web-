import React, { useEffect, useState } from 'react';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load stats');
        return r.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section className="section alt" id="stats">
      <div className="container">
        <h2>Impact Across Nepal</h2>
        {error && <p className="error">{error}</p>}
        <div className="stats">
          <div className="stat">
            <div className="stat-number">{stats ? stats.donors : '—'}</div>
            <div className="stat-label">Registered Donors</div>
          </div>
          <div className="stat">
            <div className="stat-number">{stats ? stats.drives : '—'}</div>
            <div className="stat-label">Blood Drives</div>
          </div>
          <div className="stat">
            <div className="stat-number">{stats ? stats.regions : '—'}</div>
            <div className="stat-label">Regions Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
