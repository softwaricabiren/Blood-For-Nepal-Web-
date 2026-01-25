import React from 'react';
import { FaUser, FaTint, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.hash = '';
  };

  if (!user) return null;

  return (
    <section className="profile-wrap">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <FaUser />
            </div>
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <button className="btn-outline btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="profile-details">
            <h3>Account Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon"><FaEnvelope /></div>
                <div>
                  <div className="detail-label">Email</div>
                  <div className="detail-value">{user.email}</div>
                </div>
              </div>

              {user.phone && (
                <div className="detail-item">
                  <div className="detail-icon"><FaPhone /></div>
                  <div>
                    <div className="detail-label">Phone</div>
                    <div className="detail-value">{user.phone}</div>
                  </div>
                </div>
              )}

              {user.bloodGroup && (
                <div className="detail-item">
                  <div className="detail-icon"><FaTint /></div>
                  <div>
                    <div className="detail-label">Blood Group</div>
                    <div className="detail-value">{user.bloodGroup}</div>
                  </div>
                </div>
              )}

              {user.province && (
                <div className="detail-item">
                  <div className="detail-icon"><FaMapMarkerAlt /></div>
                  <div>
                    <div className="detail-label">Province</div>
                    <div className="detail-value">{user.province}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <div className="action-card">
              <h4>Volunteer Status</h4>
              <p>You are an active member of our blood donor network. Thank you for your commitment to saving lives!</p>
              <div className="badge-active">Active Donor</div>
            </div>
            <div className="action-card">
              <h4>Quick Actions</h4>
              <div className="action-buttons">
                <a href="#request" className="btn">Request Blood</a>
                <a href="#donor" className="btn-outline btn">Update Availability</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
