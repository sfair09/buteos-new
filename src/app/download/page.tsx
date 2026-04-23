'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Digital Renovation: The Complete Guide to Transforming Your Business Online</h1>
            
            <div className="book-intro">
              <h2>Introduction: Your Business Has Great Bones, But Is the Facade Crumbling?</h2>
              <p>Your business is your passion. You've poured your heart, soul, and probably way too much caffeine into building it from the ground up. The quality of your work, your products, your service? It's undeniable. Your customers love you, and for good reason. Your business has great bones.</p>
              
              <p>But let's ask a tough question. If a potential new customer were to "drive by" your business online, what would they see?</p>
              
              <p>Would they see a modern, polished, and inviting storefront, or would they see a digital façade that's cracking and peeling, with a website that looks like it was designed during the dial-up era?</p>
              
              <p>This is the reality for countless incredible businesses. Their physical-world quality is top-notch, but their digital "curb appeal" is actively turning people away. This isn't just about looking good; in today's market, looking good is good business. Consider this: a staggering 75% of consumers admit to making judgments on a company's credibility based solely on its website design.</p>
              
              <p>Let that sink in. Three out of four potential customers might see your outdated site and decide—in a matter of seconds—that your business isn't professional, trustworthy, or relevant enough for their money. Your 2015 website isn't a neutral placeholder; it's a digital liability, scaring away customers and sending them straight to your competitors.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="download-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Your Position/Title"
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="cta-button"
                disabled={isSubmitting || !formData.email}
              >
                {isSubmitting ? 'Sending...' : 'Get Free Download'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}