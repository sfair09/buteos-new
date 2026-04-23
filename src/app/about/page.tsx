import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>About Buteos Systems</h1>
          <p>Strategic digital marketing consultancy specializing in hospitality and retail businesses across Texas.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Our Mission</h2>
              <p>At Buteos Systems, we empower hospitality and retail businesses to dominate their local markets through strategic digital marketing and AI transformation. From digital foundation to full transformation, we help Texas businesses command their market with comprehensive digital strategies.</p>
              
              <h2>Our Approach</h2>
              <p>We take a strategic approach to digital marketing, combining decades of industry experience with cutting-edge AI solutions. Our three-tier service model - Digital Foundation, Growth Partnership, and Full Digital Transformation - ensures we meet businesses exactly where they are in their digital journey.</p>

              <h2>Why Choose Us</h2>
              <ul className="benefits-list">
                <li><i className="fas fa-check-circle"></i> Industry-specific expertise in hospitality & retail</li>
                <li><i className="fas fa-check-circle"></i> Local SEO & Google Business Profile optimization</li>
                <li><i className="fas fa-check-circle"></i> AI-powered marketing automation</li>
                <li><i className="fas fa-check-circle"></i> Social media management & content creation</li>
                <li><i className="fas fa-check-circle"></i> Comprehensive digital transformation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt-bg">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/seth-fair.jpeg" alt="Seth Fair" />
              </div>
              <h3>Seth Fair</h3>
              <h4>CEO</h4>
              <p>A 20 year restaurant management professional with close to a decade of software experience</p>
              <a href="https://www.linkedin.com/in/seth-fair-htx/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <i className="fab fa-linkedin"></i> Connect on LinkedIn
              </a>
            </div>

            
          </div>
        </div>
      </section>

      <section className="content-section alt-bg">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Passion</h3>
              <p>We're passionate about creating exceptional digital experiences that help businesses grow.</p>
            </div>

            <div className="value-card">
              <i className="fas fa-handshake"></i>
              <h3>Integrity</h3>
              <p>We believe in honest communication and transparent processes throughout our work.</p>
            </div>

            <div className="value-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>We stay at the forefront of technology to deliver cutting-edge solutions.</p>
            </div>

            <div className="value-card">
              <i className="fas fa-users"></i>
              <h3>Collaboration</h3>
              <p>We work closely with our clients to ensure their vision becomes reality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss how we can help your business thrive in the digital world.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button">Get in Touch</Link>
            <Link href="/book" className="cta-button secondary">Book Consultation</Link>
          </div>
        </div>
      </section>
    </main>
  )
} 