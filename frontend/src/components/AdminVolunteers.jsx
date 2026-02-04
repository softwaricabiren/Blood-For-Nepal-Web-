import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchVolunteers();
  }, [page]);

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/volunteers?page=${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch volunteers');
      }

      const data = await response.json();
      setVolunteers(data.volunteers);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading volunteers...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Volunteers</h1>
          <p>Total: {total} volunteers</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td>{volunteer.id}</td>
                    <td>{volunteer.name}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.phone || 'N/A'}</td>
                    <td>{volunteer.location || 'N/A'}</td>
                    <td>{new Date(volunteer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="btn-outline btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {Math.ceil(total / 20)}</span>
            <button
              className="btn-outline btn"
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / 20)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="admin-actions">
          <a href="#admin" className="btn-outline btn">← Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
