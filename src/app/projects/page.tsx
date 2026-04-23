import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Our Projects</h1>
            <p className="tagline">
              Showcasing Our Software Development Excellence
            </p>
            <p>
              Explore our portfolio of successful software projects across various industries. From e-commerce platforms to custom web applications, see how we've helped businesses achieve their digital goals.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <div className="projects-grid">
            
            {/* The Fair Shoppe */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://placehold.co/400x300/cccccc/ffffff?text=The+Fair+Shoppe" alt="The Fair Shoppe" />
              </div>
              <div className="project-content">
                <h3>The Fair Shoppe</h3>
                <p>E-commerce platform for resell items with custom inventory management and user-friendly interface.</p>
                <div className="project-buttons">
                  <a href="https://thefairshoppe.com" target="_blank" rel="noopener noreferrer" className="cta-button">
                    Visit Site
                  </a>
                </div>
                <div className="customer-review">
                  <blockquote>
                    "Buteos Systems delivered exactly what we needed for our resale business. The platform is intuitive and has streamlined our entire operation."
                  </blockquote>
                  <cite>- Sharon F., The Fair Shoppe Owner</cite>
                </div>
              </div>
            </div>

            {/* USA Park Golf */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://placehold.co/400x300/cccccc/ffffff?text=USA+Park+Golf" alt="USA Park Golf" />
              </div>
              <div className="project-content">
                <h3>USA Park Golf</h3>
                <p>Shopify site with custom panels and layouts designed for enhanced user experience and golf equipment sales.</p>
                <div className="project-buttons">
                  <a href="https://usaparkgolf.com" target="_blank" rel="noopener noreferrer" className="cta-button">
                    Visit Site
                  </a>
                </div>
                <div className="customer-review">
                  <blockquote>
                    "The custom Shopify development exceeded our expectations. Our conversion rates improved significantly with the new design."
                  </blockquote>
                  <cite>- Gary L., USA Park Golf</cite>
                </div>
              </div>
            </div>

            {/* Tarsus */}
            <div className="project-card featured">
              <div className="project-image">
                <img src="tarsus_logo.png" alt="Tarsus_Logo" />
              </div>
              <div className="project-content">
                <h3>Tarsus</h3>
                <p>Headless FastAPI backend solution for modern developers and vibe coders. Our latest SaaS product offering scalable, secure backend infrastructure.</p>
                <div className="project-buttons">
                  <a href="https://tarsus.tech" target="_blank" rel="noopener noreferrer" className="cta-button">
                    Visit Site
                  </a>
                  <Link href="/soar-commerce" className="cta-button secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* US Furballs */}
            <div className="project-card">
              <div className="project-image">
                <img src="https://placehold.co/400x300/cccccc/ffffff?text=US+Furballs" alt="US Furballs" />
              </div>
              <div className="project-content">
                <h3>US Furballs</h3>
                <p>Soon to be launched e-commerce platform for kids products with modern design and family-friendly shopping experience.</p>
                <div className="project-buttons">
                  
                </div>
                <div className="customer-review">
                  <blockquote>
                    "Working with Buteos Systems has been fantastic. They understood our vision for a kid-friendly e-commerce platform perfectly."
                  </blockquote>
                  <cite>- Eddie C., US Furballs Founder</cite>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}