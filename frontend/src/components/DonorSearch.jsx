import React, { useState } from 'react';
import { FaTint, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const provinces = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];

export default function DonorSearch() {
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    province: '',
  });

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.bloodGroup) {
      setMessage({ type: 'error', text: 'Please select a blood group' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    setDonors([]);

    try {
      const params = new URLSearchParams();
      if (searchParams.bloodGroup) params.append('bloodGroup', searchParams.bloodGroup);
      if (searchParams.province) params.append('province', searchParams.province);

      const response = await fetch(`http://localhost:5000/api/donors/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search donors');
      }

      setDonors(data.donors || []);
      
      if (data.donors && data.donors.length === 0) {
        setMessage({ type: 'info', text: 'No donors found matching your criteria. Try adjusting your search.' });
      } else if (data.donors) {
        setMessage({ type: 'success', text: `Found ${data.donors.length} donor(s) matching your criteria.` });
      }
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
          <div className="icon-badge">
            <FaTint />
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Find Blood Donors</h2>
          <p className="section-sub" style={{ textAlign: 'center' }}>
            Search for available blood donors in your area by blood group and location.
          </p>

          {message.text && (
            <div className={`alert ${
              message.type === 'error' ? 'alert-error' : 
              message.type === 'success' ? 'alert-success' : 
              'alert-info'
            }`}>
              {message.text}
            </div>
          )}

          <form className="form" onSubmit={handleSearch}>
            <div className="form-row">
              <label className="field">
                <span>Blood Group *</span>
                <select
                  className="select"
                  name="bloodGroup"
                  value={searchParams.bloodGroup}
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
                <span>Province (Optional)</span>
                <select
                  className="select"
                  name="province"
                  value={searchParams.province}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">All Provinces</option>
                  {provinces.map((p) => (
                    <option value={p} key={p}>{p}</option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit" className="btn" disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? 'Searching...' : 'Search Donors'}
            </button>
          </form>

          {donors.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Available Donors</h3>
              <div className="donors-grid">
                {donors.map((donor) => (
                  <div key={donor.id} className="donor-card">
                    <div className="donor-header">
                      <div className="donor-avatar">
                        {donor.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{donor.name}</h4>
                        <div className="blood-badge">{donor.bloodGroup}</div>
                      </div>
                    </div>
                    <div className="donor-details">
                      {donor.province && (
                        <div className="donor-info">
                          <FaMapMarkerAlt />
                          <span>{donor.province}</span>
                        </div>
                      )}
                      {donor.phone && (
                        <div className="donor-info">
                          <FaPhone />
                          <span>{donor.phone}</span>
                        </div>
                      )}
                      {donor.email && (
                        <div className="donor-info">
                          <FaEnvelope />
                          <span>{donor.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
