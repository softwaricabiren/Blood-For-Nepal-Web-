import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
];
const provinces = [
  'Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'
];

export default function Register() {
  const { register } = useAuth();
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    province: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your full name' });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.password) {
      setMessage({ type: 'error', text: 'Please enter a password' });
      return false;
    }
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return false;
    }
    if (!agree) {
      setMessage({ type: 'error', text: 'Please agree to join the volunteer donor network' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      province: formData.province,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Redirect to home after successful registration
      setTimeout(() => {
        window.location.hash = '';
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  return (
    <div className="card-form">
      <h2 className="section-title" style={{ textAlign: 'center' }}>Create Your Account</h2>
      <p className="section-sub" style={{ textAlign: 'center' }}>
        Join our community and help save lives across Nepal.
      </p>

      {message.text && (
        <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {message.text}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full Name *</span>
          <input
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={loading}
          />
        </label>

        <div className="form-row">
          <label className="field">
            <span>Email *</span>
            <input
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={loading}
            />
          </label>
          <label className="field">
            <span>Phone Number</span>
            <input
              className="input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+977 98XXXXXXXX"
              disabled={loading}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="field">
            <span>Blood Group</span>
            <select
              className="select"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Group</option>
              {bloodGroups.map((g) => (
                <option value={g} key={g}>{g}</option>
              ))}
            </select>
          </label>
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
        </div>

        <div className="form-row">
          <label className="field">
            <span>Password *</span>
            <input
              type="password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </label>
          <label className="field">
            <span>Confirm Password *</span>
            <input
              type="password"
              className="input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </label>
        </div>

        <label className="agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            disabled={loading}
          />
          <span>
            I agree to be part of the volunteer donor network and understand that I may be contacted for emergency blood donation requests.
          </span>
        </label>

        <button type="submit" className="btn submit-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className="note">
          Already have an account? <a href="#login">Login here</a>
        </p>
      </form>
    </div>
  );
}
