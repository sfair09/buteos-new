'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    socialMedia: '',
    projectType: 'digital-foundation',
    preferredContactDate: '',
    preferredContactTime: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Thank you for your message! We\'ll get back to you shortly.' })
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          website: '',
          socialMedia: '',
          projectType: 'digital-foundation',
          preferredContactDate: '',
          preferredContactTime: '',
          message: ''
        })
      } else {
        setStatus({ type: 'error', message: data.message || 'There was an error sending your message. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'There was an error sending your message. Please try again.' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h2>Let's Build Your Vision</h2>
          <p>Whether you're interested in a digital foundation, growth partnership, or full digital transformation, we're here to help your business thrive in the digital landscape.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {status.message && (
            <div className={`alert ${status.type}`}>
              <i className={`fas fa-${status.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">
                <i className="fas fa-building"></i>
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <i className="fas fa-phone"></i>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">
                <i className="fas fa-globe"></i>
                Current Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="socialMedia">
                <i className="fas fa-hashtag"></i>
                Social Media Links
              </label>
              <input
                type="text"
                id="socialMedia"
                name="socialMedia"
                placeholder="Instagram, Facebook, LinkedIn, etc."
                value={formData.socialMedia}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">
                <i className="fas fa-project-diagram"></i>
                Service Level
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
              >
                <option value="digital-foundation">Digital Foundation</option>
                <option value="growth-partnership">Growth Partnership</option>
                <option value="digital-transformation">Full Digital Transformation</option>
                <option value="not-sure">Not Sure Yet</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preferredContactDate">
                <i className="fas fa-calendar"></i>
                Preferred Contact Date
              </label>
              <input
                type="date"
                id="preferredContactDate"
                name="preferredContactDate"
                value={formData.preferredContactDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredContactTime">
                <i className="fas fa-clock"></i>
                Preferred Contact Time
              </label>
              <input
                type="time"
                id="preferredContactTime"
                name="preferredContactTime"
                value={formData.preferredContactTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment"></i>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              ></textarea>
            </div>

            <button type="submit" className="cta-button">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>

          <div className="direct-contact">
            <p>Or email us directly at: <a href="mailto:info@buteossystems.com">info@buteossystems.com</a></p>
          </div>
        </div>
      </section>
    </main>
  )
}