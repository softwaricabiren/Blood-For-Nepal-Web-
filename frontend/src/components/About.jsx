import React from 'react';
import { FaTint, FaUsers, FaHeart, FaHandHoldingHeart, FaBullseye, FaEye } from 'react-icons/fa';

export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Blood for Nepal</h1>
          <p className="lead">
            Bridging the gap between blood donors and those in need across Nepal through technology and community engagement.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision">
          <div className="mv-card">
            <div className="mv-icon"><FaBullseye /></div>
            <h3>Our Mission</h3>
            <p>
              To create a seamless platform connecting blood donors with patients in need, ensuring that no life is lost due to unavailability of blood. We strive to build a community of voluntary donors committed to saving lives.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-icon"><FaEye /></div>
            <h3>Our Vision</h3>
            <p>
              A Nepal where every patient has access to safe blood when they need it most. We envision a future where blood donation is a regular part of civic responsibility and every community has adequate blood reserves.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="story-section">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <p>
              Blood for Nepal was founded in 2020 by a group of young professionals who witnessed firsthand the challenges faced by patients and their families in finding blood donors during emergencies. The COVID-19 pandemic highlighted the critical shortage of blood in hospitals across Nepal.
            </p>
            <p>
              What started as a small WhatsApp group connecting donors in Kathmandu has now grown into a nationwide network of over 50,000 registered donors across all 7 provinces of Nepal. Our platform has facilitated thousands of successful blood donations, helping save countless lives.
            </p>
            <p>
              We work closely with hospitals, blood banks, and healthcare providers to ensure that every blood request is matched with suitable donors as quickly as possible. Our technology-driven approach combined with community engagement has revolutionized the way blood donation works in Nepal.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><FaHeart /></div>
              <h4>Compassion</h4>
              <p>We believe in the power of human kindness and the willingness to help others in their time of need.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaUsers /></div>
              <h4>Community</h4>
              <p>Building a strong network of donors, volunteers, and supporters across Nepal.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaTint /></div>
              <h4>Reliability</h4>
              <p>Ensuring prompt response and dependable service during critical medical emergencies.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaHandHoldingHeart /></div>
              <h4>Volunteerism</h4>
              <p>Promoting voluntary blood donation as a civic duty and social responsibility.</p>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="impact-section">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="impact-number">50,000+</div>
              <div className="impact-label">Registered Donors</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">12,000+</div>
              <div className="impact-label">Lives Saved</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">85+</div>
              <div className="impact-label">Blood Drives Organized</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">7</div>
              <div className="impact-label">Provinces Covered</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <h2>Join Our Mission</h2>
          <p>
            Whether you want to become a donor, volunteer, or partner with us, there are many ways to get involved and make a difference.
          </p>
          <div className="cta-actions">
            <a href="#register" className="btn">Become a Donor</a>
            <a href="#donor" className="btn-outline btn">Search Donors</a>
          </div>
        </div>
      </div>
    </section>
  );
}
