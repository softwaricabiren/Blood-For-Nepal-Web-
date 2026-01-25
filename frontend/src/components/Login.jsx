import React, { useState } from 'react';
import { FaTint } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.password) {
      setMessage({ type: 'error', text: 'Please enter your password' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await login(formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Redirect to home after successful login
      setTimeout(() => {
        window.location.hash = '';
      }, 1000);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-card">
        <div className="icon-badge"><FaTint /></div>
        <h2 className="login-title">Login to Blood for Nepal</h2>
        <p className="login-sub">Welcome back! Let's continue saving lives.</p>

        {message.text && (
          <div className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            {message.text}
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email Address</span>
            <input
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
            />
          </label>

          <label className="field">
            <span>Password</span>
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

          <div className="login-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e)=>setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="link">Forgot your password?</a>
          </div>

          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="login-note">Don't have an account? <a href="#register" className="link">Register now</a></p>
        </form>
      </div>
    </section>
  );
}
