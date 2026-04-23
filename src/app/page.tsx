import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/BlogPosts";
import { getLocationFromHeaders } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

// Add this async function to fetch the latest blog post
async function getLatestBlogPost(): Promise<BlogPost | null> {
  try {
    // Use absolute URL for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buteossystems.com';
    const apiUrl = new URL('/api/blog/articles', baseUrl).toString();
    
    const response = await fetch(apiUrl, { cache: 'no-store', next: { revalidate: 3600 } });
    if (!response.ok) return null;
    
    const posts = await response.json();
    if (!posts || !posts.length) return null;
    
    // Sort by ID in descending order and get the first one
    const latestPost = posts.sort((a: BlogPost, b: BlogPost) => b.id - a.id)[0];
    
    // Fetch the full article data
    const articleResponse = await fetch(`${baseUrl}/api/blog/articles?id=${latestPost.id}`);
    if (!articleResponse.ok) return latestPost; // Fallback to list data if full article fetch fails
    
    const fullArticle = await articleResponse.json();
    return fullArticle;
  } catch (error) {
    console.error('Error fetching latest blog post:', error);
    return null;
  }
}


export default async function Home() {
  // Fetch the latest blog post
  const latestPost = await getLatestBlogPost();
  const userLocation = await getLocationFromHeaders();
  const content = localizedContent[userLocation];

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Tarsus Promotional Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl mx-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white rounded-xl p-2">
                <img src="/tarsus_logo.png" alt="Tarsus Logo" className="h-21 w-auto" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Introducing</h1>
                <h1 className="text-4xl md:text-5xl font-bold">Tarsus!</h1>
                <h3 className="text-xl md:text-2xl opacity-90">FastAPI secure backend for modern developers and vibe coders</h3>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://tarsus.buteossystems.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-4 py-2 md:px-10 md:py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </a>
              <Link href="/tarsus" className="bg-blue-800 hover:bg-blue-900 px-4 py-2 md:px-10 md:py-2 rounded-xl font-medium transition-colors">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-section py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">Precision Software Development, Unmatched Vision.</h1>
            <div className="hero-paragraphs mt-6 space-y-4 text-slate-600 dark:text-slate-300">
              <p>In today's digital landscape, you need more than just software—you need a commanding technological advantage. Buteos Systems is the strategic {content.locationAdjective && `${content.locationAdjective} `}software development company that gives your business a hawk's-eye view to dominate your competition.</p>
              
              <p>We go beyond standard development. We architect your entire digital ecosystem, ensuring your applications, data systems, AI integrations, and automation workflows all work in concert to achieve your primary business objectives. For our partners in {content.businessFocus}, this means streamlined operations, increased efficiency, and a stronger bottom line.</p>
              
              <p>It's time to stop competing and start commanding. Explore our offerings and find your perfect flight path, from the foundational security of Buteos Nest to the ambitious growth of Buteos Flight, or the transformative power of Buteos Talon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced blog post section with improved layout */}
      {latestPost && (
        <section className="content-section py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">Latest from Our Blog</h2>
            <div className="blog-preview-card max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden md:flex">
              <div className="md:w-1/3">
                <img 
                  className="w-full h-48 md:h-full object-cover"
                  src={
                    latestPost.main_image?.file_url || 
                    latestPost.image || 
                    'https://placehold.co/400x300/cccccc/ffffff?text=Image'
                  } 
                  alt={
                    latestPost.main_image?.alt_text || 
                    latestPost.title
                  }
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white">{latestPost.title}</h3>
                <div className="blog-meta text-sm text-slate-500 dark:text-slate-400 mt-2 mb-3">
                  <span className="mr-4"><i className="fas fa-user mr-1"></i> {latestPost.author}</span>
                  <span><i className="fas fa-calendar mr-1"></i> {latestPost.date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{latestPost.excerpt}</p>
                <Link 
                  href={`/blog/${latestPost.id}`} 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Read More <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile ad placeholders removed — Auto ads will handle placements */}

      <section id="web-design" className="content-section py-16 md:py-20 bg-emerald-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
              <i className="fas fa-home text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Nest | Software Foundation</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Your Foundation for Software Excellence. Scalable, Secure, and Built to Perform.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For {content.businessFocus} needing to establish a solid software foundation. We develop robust, scalable applications and systems that serve as the core of your digital operations. Whether you're launching a new product or modernizing existing systems, we build the reliable, performance-driven foundation your business needs to thrive in the {content.marketDescription}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-server text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Web Applications</h3>
              <p className="text-slate-600 dark:text-slate-300">Custom web applications, API development, and database design with security best practices.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-database text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Data Systems</h3>
              <p className="text-slate-600 dark:text-slate-300">Database architecture, data migration, and integration with existing business systems.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-mobile-alt text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Mobile Solutions</h3>
              <p className="text-slate-600 dark:text-slate-300">Native and cross-platform mobile applications tailored to your business needs.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/web" className="cta-button inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="ai-automation" className="content-section py-16 md:py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <i className="fas fa-rocket text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Flight | Advanced Development</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Intelligence that Elevates. Automate, Analyze, and Accelerate Your Operations.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For established {content.businessFocus} ready to leverage advanced technology for competitive advantage. Buteos Flight delivers sophisticated software solutions including AI integration, automation systems, and advanced analytics to optimize your business operations and drive measurable results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-search text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">AI Integration</h3>
              <p className="text-slate-600 dark:text-slate-300">Machine learning models, natural language processing, and intelligent automation systems.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-cogs text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Process Automation</h3>
              <p className="text-slate-600 dark:text-slate-300">Workflow automation, API integrations, and business process optimization.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-chart-line text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Analytics Platforms</h3>
              <p className="text-slate-600 dark:text-slate-300">Custom dashboards, real-time reporting, and data visualization solutions.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/agent" className="cta-button inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="custom-software" className="content-section py-16 md:py-20 bg-purple-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
              <i className="fas fa-bolt text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Talon | Enterprise Solutions</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Your Vision, Engineered to Perfection. Enterprise-Grade Solutions for Complex Challenges.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For {content.businessFocus} requiring enterprise-level software architecture and strategic technology leadership. When standard solutions fall short, we become your dedicated technology partner, architecting sophisticated systems that scale with your ambitions and deliver transformational business value.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-brain text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Enterprise Architecture</h3>
              <p className="text-slate-600 dark:text-slate-300">Scalable system design, microservices architecture, and cloud-native solutions.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-shield-alt text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Security & Compliance</h3>
              <p className="text-slate-600 dark:text-slate-300">Enterprise security implementation, compliance frameworks, and risk management.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-users text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Strategic Partnership</h3>
              <p className="text-slate-600 dark:text-slate-300">Dedicated development team, technical leadership, and ongoing strategic guidance.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/custom" className="cta-button inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="why-us" className="content-section py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6">Your Strategic Technology Partner</h2>
          <p className="section-intro text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">Buteos Systems delivers comprehensive software development solutions that evolve with your business needs. From establishing your technical foundation to driving innovation and transformation, we provide the expertise and technology you need at every stage of your journey.</p>
          <ul className="benefits-list max-w-4xl mx-auto space-y-6">
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-code text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Software Foundation:</strong> Build robust applications and systems with modern development practices and scalable architecture</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-rocket text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Advanced Development:</strong> Leverage AI, automation, and advanced analytics to optimize operations and drive growth</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-building text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Enterprise Solutions:</strong> Gain competitive advantage through enterprise architecture, security, and strategic technology leadership</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-chart-line text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Measurable Results:</strong> Deliver quantifiable business value through performance optimization and data-driven solutions</span></li>
          </ul>
        </div>
      </section>

      <section id="cta" className="content-section py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Join the {content.businessFocus} already thriving with our software development solutions.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg mr-4 mb-4 transition-colors">Contact Us</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-medium text-lg mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>
    </main>
  );
}