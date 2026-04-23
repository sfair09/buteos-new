import Link from 'next/link';
import Image from 'next/image';
import { getLocationFromHeaders } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

export default async function WebPage() {
  const userLocation = await getLocationFromHeaders();
  const content = localizedContent[userLocation];
  
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Software Foundation Services{content.location && ` in ${content.location}`}</h1>
            <p className="tagline">
              Your Foundation for Software Excellence. Scalable, Secure, and Built to Perform.
            </p>
            <p>
              For {content.businessFocus} needing to establish a solid software foundation. We develop robust, scalable applications and systems that serve as the core of your digital operations. Whether you're launching a new product or modernizing existing systems, we build the reliable, performance-driven foundation your business needs to thrive in the {content.marketDescription}.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-server"></i>
              <h3>Web Applications</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For businesses needing custom web applications and API development.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Build powerful web applications with modern frameworks and secure APIs. We create scalable solutions that grow with your business needs.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <h4>Custom Web Development</h4>
                  <p>Responsive web applications built with modern frameworks and best practices</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-plug"></i>
                  </div>
                  <h4>API Development</h4>
                  <p>RESTful APIs and integrations with third-party services</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Data Systems</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Design and implement robust database systems and data architecture to support your business operations and growth.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-database"></i>
                  </div>
                  <h4>Database Design</h4>
                  <p>Scalable database architecture and optimization for performance</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-exchange-alt"></i>
                  </div>
                  <h4>Data Migration</h4>
                  <p>Seamless migration and integration with existing business systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-hashtag"></i>
              <h3>Mobile Solutions</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Develop native and cross-platform mobile applications tailored to your business needs and user requirements.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h4>Native App Development</h4>
                  <p>iOS and Android applications built for optimal performance</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <h4>Cross-Platform Solutions</h4>
                  <p>React Native and Flutter apps for multiple platforms</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Security & Testing</h4>
                  <p>Comprehensive testing and security implementation</p>
                </div>
              </div>
            </div>
          </div>
          
          {content.location && (
            <div className="local-seo-section">
              <h2>Why Choose {content.location} Software Development?</h2>
              <p>As a {content.locationAdjective} software development company, we understand the unique technology challenges facing {content.businessFocus}. From legacy system modernization to scalable application development, our Software Foundation services are specifically designed to help {content.location} businesses build robust technical infrastructure.</p>
              <ul>
                <li>Local {content.location} market and technology expertise</li>
                <li>Custom application development for {content.location} businesses</li>
                <li>{content.location}-focused software solutions and integrations</li>
                <li>Mobile and web development tailored to {content.location} market needs</li>
              </ul>
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