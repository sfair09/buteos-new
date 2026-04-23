import Link from 'next/link';
import Image from 'next/image';
import { getLocationFromHeaders } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

export default async function AgentPage() {
  const userLocation = await getLocationFromHeaders();
  const content = localizedContent[userLocation];
  
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Advanced Development Services{content.location && ` - ${content.location} Software Solutions`}</h1>
            <p className="tagline">
              Intelligence that Elevates. Automate, Analyze, and Accelerate Your Operations.
            </p>
            <p>
              For established {content.businessFocus} ready to leverage advanced technology for competitive advantage. Our Advanced Development services integrate sophisticated software solutions including AI integration, automation systems, and advanced analytics to optimize your business operations and drive measurable results. Let us equip your business with the intelligent systems to anticipate challenges and seize opportunities in the competitive {content.marketDescription}.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-search"></i>
              <h3>AI Integration & Machine Learning</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For established businesses ready to leverage AI for competitive advantage.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Integrate artificial intelligence and machine learning capabilities into your business processes to automate decisions and gain insights.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-brain"></i>
                  </div>
                  <h4>Machine Learning Models</h4>
                  <p>Custom ML models for prediction, classification, and optimization</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h4>Natural Language Processing</h4>
                  <p>Text analysis, sentiment analysis, and chatbot development</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-robot"></i>
                  </div>
                  <h4>Intelligent Automation</h4>
                  <p>AI-powered workflow automation and decision systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-ad"></i>
              <h3>Process Automation & Integration</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Streamline business operations with intelligent automation and seamless system integrations.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h4>Workflow Automation</h4>
                  <p>Automated business processes and task management systems</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-plug"></i>
                  </div>
                  <h4>API Integrations</h4>
                  <p>Connect disparate systems and third-party services</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <h4>Business Process Optimization</h4>
                  <p>Analysis and improvement of existing workflows</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-robot"></i>
              <h3>Analytics Platforms & Dashboards</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Transform your data into actionable insights with custom analytics platforms and real-time dashboards.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <h4>Custom Dashboards</h4>
                  <p>Real-time business intelligence and performance monitoring</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                  <h4>Data Visualization</h4>
                  <p>Interactive charts, graphs, and reporting tools</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <h4>Automated Reporting</h4>
                  <p>Scheduled reports and performance analytics</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-plus-circle"></i>
              <h3>All Software Foundation Services</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Comprehensive development solution with web applications, data systems, and mobile solutions.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <h4>Web Applications</h4>
                  <p>Custom web development and API creation</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-database"></i>
                  </div>
                  <h4>Data Systems</h4>
                  <p>Database design and data migration services</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h4>Mobile Solutions</h4>
                  <p>Native and cross-platform mobile applications</p>
                </div>
              </div>
            </div>
          </div>
          
          {content.location && (
            <div className="local-seo-section">
              <h2>{content.location}'s Premier Advanced Development Partnership</h2>
              <p>Serving {content.location}'s thriving business sectors, our Advanced Development services are designed to help established {content.businessFocus} leverage cutting-edge technology for competitive advantage. We understand the {content.location} market dynamics and technology needs.</p>
              <div className="local-benefits">
                <h3>{content.location} Technology Advantages:</h3>
                <ul>
                  <li>Compete effectively with advanced technology solutions in {content.location}</li>
                  <li>Leverage AI and automation for {content.location}-area business optimization</li>
                  <li>Implement {content.location} market-specific software solutions</li>
                  <li>Build technological competitive advantages in the {content.location} community</li>
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