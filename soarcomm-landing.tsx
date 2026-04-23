'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function LandingPage() {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const footerThreshold = documentHeight - 100;
      setIsFooterVisible(scrollPosition >= footerThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="animate-fade-in" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src="/soarcomm-logo.png" 
              alt="Soar Commerce" 
              className="h-24 sm:h-32 md:h-40 w-auto"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <p className="animate-fade-in">
            A powerful headless FastAPI ecommerce solution designed for modern developers. 
            Build custom storefronts with a robust, scalable backend.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/register" className="cta-button">
              Get Started Free
            </Link>
            <Link href="#features" className="cta-button secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="content-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Why Choose Soar Commerce?</h2>
          <p className="section-intro">
            Build faster, scale easier. Our headless commerce platform gives you the flexibility 
            to create unique shopping experiences while we handle the complex backend infrastructure.
          </p>
          
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast & Scalable</h3>
              <p>
                Built on FastAPI, our backend is optimized for performance. Handle high traffic 
                and scale seamlessly as your business grows.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔌</div>
              <h3>Headless Architecture</h3>
              <p>
                Complete API-first design. Connect any frontend framework - React, Vue, Next.js, 
                or even native mobile apps. Full control over your customer experience.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Developer Friendly</h3>
              <p>
                Well-documented REST APIs, comprehensive authentication, and clear code structure. 
                Get up and running quickly with our developer resources.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Complete Ecommerce</h3>
              <p>
                Products, categories, orders, payments, shipping - everything you need out of the box. 
                Focus on your unique features, not building basics.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure by Default</h3>
              <p>
                Built-in authentication, secure payment processing, and data protection. 
                Enterprise-grade security without the enterprise complexity.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Ready</h3>
              <p>
                Track usage, monitor performance, and understand your customers. 
                Built-in analytics and reporting tools to make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="content-section alt-bg">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Built for Modern Development</h2>
          <p className="section-intro">
            Stop wrestling with legacy platforms. Soar Commerce is built with modern development 
            practices in mind.
          </p>
          
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>RESTful APIs</h3>
              <p>
                Clean, intuitive REST endpoints for all your ecommerce operations. 
                Easy to integrate, easy to extend.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3>API Key Management</h3>
              <p>
                Secure API key management with usage tracking. Monitor your API calls 
                and manage access levels effortlessly.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Complete Customization</h3>
              <p>
                No templates, no limitations. Build exactly the shopping experience you envision 
                with full control over design and functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="content-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Perfect For</h2>
          <p className="section-intro">
            Whether you're a startup or an enterprise, Soar Commerce adapts to your needs.
          </p>
          
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Startups</h3>
              <p>
                Launch quickly with a robust backend. Focus on your unique value proposition 
                while we handle the commerce infrastructure.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Enterprise</h3>
              <p>
                Scale without limits. Our platform grows with you, handling high traffic 
                and complex requirements.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍💻</div>
              <h3>Developers</h3>
              <p>
                Build custom ecommerce solutions without reinventing the wheel. 
                Use our backend, create your frontend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section alt-bg" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text)' }}>
            Ready to Soar?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Join developers who are building the next generation of ecommerce experiences. 
            Start your free trial today and see how easy headless commerce can be.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="cta-button" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              Start Free Trial
            </Link>
            <Link href="/login" className="cta-button secondary" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              Sign In
            </Link>
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <Footer isVisible={isFooterVisible} />
    </div>
  );
}
