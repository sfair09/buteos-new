import Link from 'next/link';
import Image from 'next/image';
import { getLocationFromHeaders } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

export default async function CustomPage() {
  const userLocation = await getLocationFromHeaders();
  const content = localizedContent[userLocation];
  
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Enterprise Software Solutions{content.location && ` - ${content.location} Custom Development`}</h1>
            <p className="tagline">
              Your Vision, Engineered to Perfection. Enterprise-Grade Solutions for Complex Challenges.
            </p>
            <p>
              For {content.businessFocus} requiring enterprise-level software architecture and strategic technology leadership. When standard solutions fall short, we become your dedicated technology partner, architecting sophisticated systems that scale with your ambitions and deliver transformational business value{content.location && ` in the ${content.marketDescription}`}.
            </p>
            <p>
              From enterprise architecture to custom software development, our process is collaborative, agile, and transparent. We combine your business expertise with our technical mastery to build powerful, scalable systems that become your ultimate competitive advantage{content.location && ` in the ${content.marketDescription}`}.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-brain"></i>
              <h3>Enterprise Architecture & Design</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For businesses requiring enterprise-level software architecture and scalability.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Design and implement enterprise-grade software architecture that scales with your business growth and handles complex requirements.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-sitemap"></i>
                  </div>
                  <h4>System Architecture Design</h4>
                  <p>Scalable system design and microservices architecture</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <h4>Cloud-Native Solutions</h4>
                  <p>Modern cloud architecture and containerization strategies</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h4>Performance Optimization</h4>
                  <p>High-performance system design and optimization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-chart-bar"></i>
              <h3>Security & Compliance</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Implement enterprise-grade security measures and compliance frameworks to protect your business and data.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Enterprise Security</h4>
                  <p>Comprehensive security implementation and vulnerability assessment</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <h4>Compliance Frameworks</h4>
                  <p>Implementation of industry-specific compliance requirements</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h4>Risk Management</h4>
                  <p>Risk assessment and mitigation strategies for enterprise systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-handshake"></i>
              <h3>Strategic Technology Partnership</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Benefit from dedicated development team, technical leadership, and ongoing strategic guidance for your technology initiatives.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4>Dedicated Development Team</h4>
                  <p>Assigned team of senior developers and architects</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h4>Technical Leadership</h4>
                  <p>CTO-level guidance and technology strategy consulting</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-compass"></i>
                  </div>
                  <h4>Strategic Guidance</h4>
                  <p>Ongoing technology roadmap and strategic planning</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-plus-circle"></i>
              <h3>All Advanced Development Services</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Comprehensive software solutions including AI integration, process automation, and analytics platforms.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-brain"></i>
                  </div>
                  <h4>AI Integration</h4>
                  <p>Machine learning models and intelligent automation systems</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h4>Process Automation</h4>
                  <p>Workflow automation and API integrations</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h4>Analytics Platforms</h4>
                  <p>Custom dashboards and data visualization solutions</p>
                </div>
              </div>
            </div>
          </div>
          
          {content.location && (
            <div className="local-seo-section">
              <h2>Leading {content.location}'s Enterprise Software Revolution</h2>
              <p>As {content.location}'s premier enterprise software development company, we're helping {content.businessFocus} leverage cutting-edge technology and enterprise architecture to dominate their markets. We're transforming how {content.location} businesses operate with scalable, secure software solutions.</p>
              <div className="transformation-examples">
                <h3>{content.location} Enterprise Solutions:</h3>
                <ul>
                  <li>Enterprise-grade systems for {content.location} multi-location businesses</li>
                  <li>Scalable cloud architecture for {content.location} growing companies</li>
                  <li>Custom enterprise software for {content.location} industry leaders</li>
                  <li>Security and compliance solutions for {content.location} regulated industries</li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="cta-container">
            <Link href="/book" className="cta-button">{content.ctaText}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}