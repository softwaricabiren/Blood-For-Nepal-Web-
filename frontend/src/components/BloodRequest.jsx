import React, { useState } from 'react';
import { FaTint } from 'react-icons/fa';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const provinces = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];
const urgencyLevels = ['Emergency', 'Urgent', 'Normal'];

export default function BloodRequest() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    hospital: '',
    province: '',
    city: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    urgency: 'Normal',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) {
      setMessage({ type: 'error', text: 'Please enter patient name' });
      return false;
    }
    if (!formData.bloodGroup) {
      setMessage({ type: 'error', text: 'Please select blood group' });
      return false;
    }
    if (!formData.unitsNeeded || formData.unitsNeeded < 1) {
      setMessage({ type: 'error', text: 'Please enter valid units needed' });
      return false;
    }
    if (!formData.hospital.trim()) {
      setMessage({ type: 'error', text: 'Please enter hospital name' });
      return false;
    }
    if (!formData.contactPhone.trim()) {
      setMessage({ type: 'error', text: 'Please enter contact phone' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/blood-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setMessage({ type: 'success', text: 'Blood request submitted successfully! We will notify nearby donors.' });
      setFormData({
        patientName: '',
        bloodGroup: '',
        unitsNeeded: '',
        hospital: '',
        province: '',
        city: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        urgency: 'Normal',
        additionalInfo: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <div className="container">
        <div className="card-form">
          <div className="icon-badge" style={{ background: '#dc2626' }}>
            <FaTint />
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Request Blood</h2>
          <p className="section-sub" style={{ textAlign: 'center' }}>
            Fill out this form and we'll notify nearby donors who match your requirements.
          </p>

          {message.text && (
            <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              {message.text}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Patient Information</h3>
            
            <label className="field">
              <span>Patient Name *</span>
              <input
                className="input"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Full name of patient"
                disabled={loading}
              />
            </label>

            <div className="form-row">
              <label className="field">
                <span>Blood Group Required *</span>
                <select
                  className="select"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((g) => (
                    <option value={g} key={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Units Needed *</span>
                <input
                  type="number"
                  className="input"
                  name="unitsNeeded"
                  value={formData.unitsNeeded}
                  onChange={handleChange}
                  placeholder="Number of units"
                  min="1"
                  disabled={loading}
                />
              </label>
            </div>

            <div className="form-row">
              <label className="field">
                <span>Hospital Name *</span>
                <input
                  className="input"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="Hospital/Medical Center"
                  disabled={loading}
                />
              </label>
              <label className="field">
                <span>Urgency Level *</span>
                <select
                  className="select"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {urgencyLevels.map((level) => (
                    <option value={level} key={level}>{level}</option>
                  ))}
                </select>
              </label>
            </div>

            <h3 style={{ marginBottom: '15px', marginTop: '20px', fontSize: '18px' }}>Location</h3>

            <div className="form-row">
              <label className="field">
                <span>Province</span>
                <select
                  className="select"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Province</option>
                  {provinces.map((p) => (
                    <option value={p} key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>City</span>
                <input
                  className="input"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  disabled={loading}
                />
              </label>
            </div>

            <h3 style={{ marginBottom: '15px', marginTop: '20px', fontSize: '18px' }}>Contact Information</h3>

            <label className="field">
              <span>Contact Person Name</span>
              <input
                className="input"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Name of contact person"
                disabled={loading}
              />
            </label>

            <div className="form-row">
              <label className="field">
                <span>Contact Phone *</span>
                <input
                  className="input"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  disabled={loading}
                />
              </label>
              <label className="field">
                <span>Contact Email</span>
                <input
                  type="email"
                  className="input"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  disabled={loading}
                />
              </label>
            </div>

            <label className="field">
              <span>Additional Information</span>
              <textarea
                className="input"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional details..."
                rows="4"
                disabled={loading}
              />
            </label>

            <button type="submit" className="btn" disabled={loading} style={{ marginTop: '20px' }}>
              {loading ? 'Submitting...' : 'Submit Blood Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
