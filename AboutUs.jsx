import React from 'react';
import './AboutUs.css';

const AboutUs = ({ onClose }) => {
  const features = [
    {
      icon: '🚨',
      title: 'Emergency SOS',
      description: 'Quick access to emergency services with customizable emergency types and automatic contact notification.',
      details: 'One-tap SOS activation with 3-second countdown, supports multiple emergency categories, and instantly alerts your emergency contacts.'
    },
    {
      icon: '📍',
      title: 'Smart Geofencing',
      description: 'Real-time location monitoring with intelligent zone detection for enhanced safety.',
      details: 'Advanced geofencing technology that creates virtual safety perimeters and provides instant alerts when entering danger zones.'
    },
    {
      icon: '👥',
      title: 'Contact Management',
      description: 'Manage emergency and personal contacts with seamless integration across all safety features.',
      details: 'Comprehensive contact system supporting family, friends, and emergency services with relationship categorization.'
    },
    {
      icon: '🌐',
      title: 'Multi-City Support',
      description: 'Optimized safety protocols for multiple cities with localized emergency services.',
      details: 'City-specific safety data including local emergency numbers, hospitals, and area-specific risk assessments.'
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'Continuous backend synchronization ensuring your safety data is always up-to-date.',
      details: 'Seamless cloud integration with offline mode support, ensuring functionality even without internet connectivity.'
    },
    {
      icon: '🛡️',
      title: 'Privacy First',
      description: 'Your location and personal data are encrypted and only shared when necessary for safety.',
      details: 'End-to-end encryption, minimal data collection, and transparent privacy controls put you in charge of your information.'
    }
  ];

  const stats = [
    { number: '24/7', label: 'Emergency Response' },
    { number: '10+', label: 'Supported Cities' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '<3s', label: 'SOS Activation Time' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Safety Technology Lead',
      bio: 'Former emergency responder with 10+ years experience in crisis management and safety protocols.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Geofencing Specialist',
      bio: 'Expert in location-based services and real-time monitoring systems with focus on accuracy and privacy.',
      image: '👨‍💻'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Emergency Medicine Consultant',
      bio: 'Board-certified emergency physician ensuring medical accuracy in our emergency response protocols.',
      image: '👩‍⚕️'
    }
  ];

  return (
    <div className="about-overlay">
      <div className="about-container">
        <div className="about-header">
          <button className="close-btn" onClick={onClose}>✕</button>
          <div className="hero-section">
            <h1 className="hero-title">SafeGuard Pro</h1>
            <p className="hero-subtitle">Advanced Personal Safety & Emergency Response System</p>
            <div className="hero-description">
              <p>Protecting what matters most through intelligent technology, real-time monitoring, and instant emergency response capabilities.</p>
            </div>
          </div>
        </div>

        <div className="about-content">
          {/* Mission Statement */}
          <section className="mission-section">
            <h2>Our Mission</h2>
            <div className="mission-card">
              <p>We believe everyone deserves to feel safe and secure, no matter where they are. SafeGuard Pro combines cutting-edge technology with human-centered design to create a comprehensive safety ecosystem that responds instantly when you need help most.</p>
              <div className="mission-values">
                <div className="value-item">
                  <span className="value-icon">⚡</span>
                  <span>Instant Response</span>
                </div>
                <div className="value-item">
                  <span className="value-icon">🔒</span>
                  <span>Privacy Protected</span>
                </div>
                <div className="value-item">
                  <span className="value-icon">🎯</span>
                  <span>User Focused</span>
                </div>
                <div className="value-item">
                  <span className="value-icon">🌍</span>
                  <span>Always Available</span>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <p className="feature-details">{feature.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics */}
          <section className="stats-section">
            <h2>By the Numbers</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="how-it-works">
            <h2>How SafeGuard Pro Works</h2>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Setup Your Profile</h4>
                  <p>Add emergency contacts, select your city, and configure your safety preferences.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Real-time Monitoring</h4>
                  <p>Our geofencing system continuously monitors your location and safety status.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Instant Alerts</h4>
                  <p>Receive immediate notifications about safety zones and potential risks.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Emergency Response</h4>
                  <p>One-tap SOS activation instantly alerts contacts and emergency services.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2>Meet Our Safety Experts</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">{member.image}</div>
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Commitment */}
          <section className="commitment-section">
            <h2>Our Safety Commitment</h2>
            <div className="commitment-grid">
              <div className="commitment-card">
                <h4>🔐 Data Security</h4>
                <p>Your personal information is encrypted end-to-end and never shared without your explicit consent.</p>
              </div>
              <div className="commitment-card">
                <h4>⚡ Response Time</h4>
                <p>Our systems are designed for sub-second response times with 99.9% uptime guarantee.</p>
              </div>
              <div className="commitment-card">
                <h4>🛡️ Privacy First</h4>
                <p>We collect only the minimum data necessary for safety features and give you full control.</p>
              </div>
              <div className="commitment-card">
                <h4>🌐 Global Coverage</h4>
                <p>Expanding support to more cities worldwide while maintaining local emergency service integration.</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="contact-section">
            <h2>Get in Touch</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <h4>Emergency Support</h4>
                <p>24/7 Emergency Helpline</p>
                <p className="contact-info">🚨 1-800-SAFEGUARD</p>
              </div>
              <div className="contact-card">
                <h4>Technical Support</h4>
                <p>App issues and technical questions</p>
                <p className="contact-info">📧 support@safeguardpro.com</p>
              </div>
              <div className="contact-card">
                <h4>General Inquiries</h4>
                <p>Questions about our services</p>
                <p className="contact-info">📞 1-800-INFO-SAFE</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="about-footer">
            <div className="footer-content">
              <p>&copy; 2024 SafeGuard Pro. Your safety is our priority.</p>
              <div className="footer-links">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Emergency Protocols</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;