import React, { useEffect, useState } from 'react';
import { FaTint, FaUsers, FaHospital, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaUser } from 'react-icons/fa';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import UserProfile from './components/UserProfile.jsx';
import BloodRequest from './components/BloodRequest.jsx';
import DonorSearch from './components/DonorSearch.jsx';
import About from './components/About.jsx';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [page, setPage] = useState('home');
  
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash;
      if (h === '#register') setPage('register');
      else if (h === '#login') setPage('login');
      else if (h === '#profile') setPage('profile');
      else if (h === '#request') setPage('request');
      else if (h === '#donor') setPage('donor');
      else if (h === '#about') setPage('about');
      else setPage('home');
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.hash = '';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <header className="container nav">
        <div className="left">
          <span style={{ fontSize: 20 }}>🩸</span>
          <div className="brand">Blood for Nepal</div>
          <ul>
            <li><a href="#" onClick={(e)=>{e.preventDefault(); window.location.hash='';}}>Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#donor">Become a Donor</a></li>
            <li><a href="#request">Request Blood</a></li>
          </ul>
        </div>
        <div className="actions">
          {user ? (
            <>
              <a className="btn-outline btn" href="#profile" onClick={(e)=>{e.preventDefault(); window.location.hash='profile';}}>
                <FaUser style={{ marginRight: '6px' }} />
                {user.name}
              </a>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <a className="btn-outline btn" href="#login" onClick={(e)=>{e.preventDefault(); window.location.hash='login';}}>Login</a>
              <a className="btn" href="#register" onClick={(e)=>{e.preventDefault(); window.location.hash='register';}}>Register</a>
            </>
          )}
        </div>
      </header>

      {page === 'home' && (
        <>
          {/* Hero */}
          <section className="hero">
            <div className="container wrap">
              <div>
                <h1>Donate Blood,
                  <br />
                  Save Lives in Nepal
                </h1>
                <p>
                  Empowering the youth and community to bridge the gap between donors and patients. Every drop counts. Join our mission today.
                </p>
                <div className="ctas">
                  <a className="btn" href="#donor">Become a Donor</a>
                  <a className="btn-outline btn" href="#request">Request Blood</a>
                </div>
              </div>
              <img alt="Mountains at night" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" />
            </div>
            <div className="container stats-row">
              <div className="stat-box">
                <div className="stat-number">50K+</div>
                <div className="stat-label">REGISTERED DONORS</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">12K+</div>
                <div className="stat-label">LIVES SAVED</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">75+</div>
                <div className="stat-label">HOSPITALS</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">24/7</div>
                <div className="stat-label">SUPPORT</div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="section">
            <div className="container">
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-sub">Our technology simplifies the complex process of finding blood matches.</p>
              <div className="cards">
                <div className="card">
                  <div className="icon"><FaTint /></div>
                  <h3>Emergency Requests</h3>
                  <p>Instant notifications for critical blood needs in your local area.</p>
                </div>
                <div className="card">
                  <div className="icon"><FaUsers /></div>
                  <h3>Volunteer Network</h3>
                  <p>Join a community of 50,000+ registered donors across 7 provinces.</p>
                </div>
                <div className="card">
                  <div className="icon"><FaHospital /></div>
                  <h3>Hospital Connectivity</h3>
                  <p>Direct integration with major hospitals for faster verification.</p>
                </div>
                <div className="card">
                  <div className="icon"><FaMapMarkerAlt /></div>
                  <h3>Location Matching</h3>
                  <p>Find the nearest available donor using smart geolocation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA band */}
          <section className="cta-band">
            <div className="container">
              <h2>Ready to make a difference?</h2>
              <p>Join thousands of Nepalis who are helping their neighbors in times of crisis.</p>
              <div className="cta-actions">
                <a className="btn" href="#donor">Start Donating</a>
                <a className="btn-outline btn" href="#request">I Need Blood</a>
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'register' && (
        <section className="register-wrap">
          <div className="container">
            <Register />
          </div>
        </section>
      )}

      {page === 'login' && (
        <Login />
      )}

      {page === 'profile' && user && (
        <UserProfile />
      )}

      {page === 'request' && (
        <BloodRequest />
      )}

      {page === 'donor' && (
        <DonorSearch />
      )}

      {page === 'about' && (
        <About />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container grid">
          <div>
            <h4>🩸 Blood for Nepal</h4>
            <p>We are a non-profit organization dedicated to connecting blood donors with those in critical need across Nepal.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="bullets" style={{ paddingLeft: 0 }}>
              <a href="#how">How it Works</a>
              <a href="#impact">Impact Stories</a>
              <a href="#policy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="bullets" style={{ paddingLeft: 0 }}>
              <span>Email: help@bloodfornepal.org</span>
              <span>Phone: +977 1 4XXXXX</span>
              <span>Location: Kathmandu, Nepal</span>
            </div>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="social">
              <span className="chip" aria-label="Facebook"><FaFacebookF /></span>
              <span className="chip" aria-label="Twitter"><FaTwitter /></span>
              <span className="chip" aria-label="Instagram"><FaInstagram /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
