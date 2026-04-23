export default function Terms() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="legal-content">
            <h2>1. Agreement to Terms</h2>
            <p>By accessing and using Buteos Systems' services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p>

            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in our services</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Service Delivery</h2>
            <p>We commit to delivering our services according to the specifications agreed upon in your selected package. However, we cannot guarantee that our services will be uninterrupted, timely, secure, or error-free.</p>

            <h2>4. Payment Terms</h2>
            <p>Payment is due in full before the commencement of work for one-time projects. For subscription services, payment is due at the beginning of each billing cycle. All prices are in USD and are subject to change with notice.</p>

            <h2>5. Intellectual Property</h2>
            <p>All content, features, and functionality of our services are owned by Buteos Systems and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

            <h2>6. Limitation of Liability</h2>
            <p>In no event shall Buteos Systems be liable for any damages arising out of the use or inability to use our services, even if we have been notified of the possibility of such damages.</p>

            <h2>7. Revisions and Errata</h2>
            <p>The materials appearing on our services could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.</p>

            <h2>8. Links</h2>
            <p>We have not reviewed all of the sites linked to our services and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Buteos Systems.</p>

            <h2>9. Modifications</h2>
            <p>We may revise these terms of service at any time without notice. By using our services, you agree to be bound by the current version of these terms of service.</p>

            <h2>10. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>
        </div>
      </section>
    </main>
  )
} 