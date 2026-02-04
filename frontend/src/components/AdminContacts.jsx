import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/contacts?page=${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      setContacts(data.contacts);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading messages...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Contact Messages</h1>
          <p>Total: {total} messages</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="admin-card">
          <div className="contact-messages">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-message-card">
                <div className="contact-header">
                  <div>
                    <h4>{contact.name}</h4>
                    <p className="contact-email">{contact.email}</p>
                  </div>
                  <div className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="contact-message">
                  {contact.message}
                </div>
              </div>
            ))}
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
