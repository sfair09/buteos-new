import Link from "next/link";

export const metadata = {
  title: 'Tarsus - Headless FastAPI Backend Solution',
  description: 'A powerful headless FastAPI solution designed for modern developers and vibe coders. Build custom frontends with a robust, scalable backend.',
};

export default function SoarCommerce() {
  return (
    <main className="bg-white dark:bg-gray-900 soar-commerce-page">
      {/* Hero Section */}
      <section className="hero-section pt-6 pb-12 md:pt-8 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img 
                src="/tarsus_logo.png" 
                alt="Tarsus_Logo" 
                className="h-64 sm:h-72 md:h-80 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              FastAPI secure backend for Modern Developers and Vibe Coders alike
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              A powerful headless FastAPI backend solution custom atilored for vibe coders. 
              Build your dream app with a robust, scalable backend.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="https://tarsus.buteossystems.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Get Started Free
              </a>
              <Link 
                href="/contact" 
                className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6">
            Why Choose Tarsus?
          </h2>
          <p className="text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">
            Build faster, scale easier. Our headless backend platform gives you the flexibility 
            to create unique experiences while we handle the complex backend infrastructure.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Fast & Scalable</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built on FastAPI, our backend is optimized for performance. Handle high traffic 
                and scale seamlessly as your business grows.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Headless Architecture</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Complete API-first design. Connect any frontend framework - React, Vue, Next.js, 
                or even native mobile apps. Full control over your user experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Developer Friendly</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Well-documented REST APIs, comprehensive authentication, and clear code structure. 
                Get up and running quickly with our developer resources.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Secure by Default</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built-in authentication, secure payment processing, and data protection. 
                Enterprise-grade security without the enterprise complexity.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Complete Ecommerce</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Products, categories, orders, payments, shipping - everything ecommerce out of the box. 
                Focus on your unique features, not building basics.
              </p>
            </div>
            
            
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Analytics Ready</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track usage, monitor performance, and understand your customers. 
                Built-in analytics and reporting tools to make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Benefits Section */}
      <section className="content-section py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6">
            Built for Modern Development
          </h2>
          <p className="text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">
            Stop wrestling with legacy platforms. Tarsus is built with modern development 
            practices in mind.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">RESTful APIs</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Clean, intuitive REST endpoints for all your operations. 
                Easy to integrate, easy to extend.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">API Key Management</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Secure API key management with usage tracking. Monitor your API calls 
                and manage access levels effortlessly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Complete Customization</h3>
              <p className="text-slate-600 dark:text-slate-300">
                No templates, no limitations. Build exactly the experience you envision 
                with full control over design and functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="content-section py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6">
            Perfect For
          </h2>
          <p className="text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">
            Whether you're a startup or an enterprise, Tarsus adapts to your needs.
            Our dev team is always ready to ensure that your vision comes to life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Startups</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Launch quickly with a robust backend. Focus on your unique value proposition 
                while we handle the infrastructure.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Enterprise</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Scale without limits. Our platform grows with you, handling high traffic 
                and complex requirements.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">👨💻</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Developers</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Build custom solutions without reinventing the wheel. 
                Use our backend, create your frontend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Ready to stabilize your app with Tarsus?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Join developers who are building the next generation of ecommerce experiences. 
            Start your free trial today and see how easy headless commerce can be.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://tarsus.buteossystems.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              Start Free Trial
            </a>
            <Link 
              href="/contact" 
              className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>
          <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}