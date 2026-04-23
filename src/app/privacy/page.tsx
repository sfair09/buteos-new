export default function Privacy() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="legal-content">
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Company information</li>
              <li>Payment information</li>
              <li>Project requirements and preferences</li>
              <li>Communication history</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process your payments</li>
              <li>Communicate with you about your projects</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Improve our services</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for handling transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your information</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings.</p>

            <h2>7. Third-Party Services</h2>
            <p>Our services may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review their privacy policies.</p>

            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>

            <h2>9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at:</p>
            <ul>
              <li>Email: privacy@buteossystems.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Business Street, Suite 100, City, State 12345</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
} 