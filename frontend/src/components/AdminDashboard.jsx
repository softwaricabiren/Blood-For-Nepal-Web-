import React, { useEffect, useState } from 'react';
import { FaUsers, FaTint, FaHandHoldingHeart, FaEnvelope, FaChartLine, FaClock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe' }}>
              <FaUsers style={{ color: '#1e40af' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.totalUsers || 0}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2' }}>
              <FaTint style={{ color: '#dc2626' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.totalRequests || 0}</div>
              <div className="stat-label">Blood Requests</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7' }}>
              <FaClock style={{ color: '#d97706' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.pendingRequests || 0}</div>
              <div className="stat-label">Pending Requests</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5' }}>
              <FaChartLine style={{ color: '#059669' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.completedRequests || 0}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff' }}>
              <FaHandHoldingHeart style={{ color: '#4f46e5' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.totalVolunteers || 0}</div>
              <div className="stat-label">Volunteers</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon" style={{ background: '#fce7f3' }}>
              <FaEnvelope style={{ color: '#be123c' }} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.stats?.totalContacts || 0}</div>
              <div className="stat-label">Messages</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-content-grid">
          <div className="admin-card">
            <h3>Recent Users</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Blood Group</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentUsers?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="blood-badge-sm">{user.bloodGroup || 'N/A'}</span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card">
            <h3>Recent Blood Requests</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood</th>
                    <th>Urgency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentRequests?.map((request) => (
                    <tr key={request.id}>
                      <td>{request.patientName}</td>
                      <td>
                        <span className="blood-badge-sm">{request.bloodGroup}</span>
                      </td>
                      <td>
                        <span className={`urgency-badge urgency-${request.urgency.toLowerCase()}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Navigation to other admin sections */}
        <div className="admin-nav-cards">
          <a href="#admin-users" className="admin-nav-card">
            <FaUsers />
            <h4>Manage Users</h4>
            <p>View and manage all registered users</p>
          </a>
          <a href="#admin-requests" className="admin-nav-card">
            <FaTint />
            <h4>Blood Requests</h4>
            <p>Manage all blood requests</p>
          </a>
          <a href="#admin-volunteers" className="admin-nav-card">
            <FaHandHoldingHeart />
            <h4>Volunteers</h4>
            <p>View volunteer registrations</p>
          </a>
          <a href="#admin-contacts" className="admin-nav-card">
            <FaEnvelope />
            <h4>Messages</h4>
            <p>View contact messages</p>
          </a>
        </div>
      </div>
    </div>
  );
}
