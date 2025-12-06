import React from 'react';
import '../assets/Styles/TermsAndCondition.scss';

const TermsAndCondition = () => {
  return (
    <div className="terms-container">
      <div className="container">
        <div className="terms-content">
          <div className="terms-header">
            <h1>Terms and Conditions</h1>
            <p className="last-updated">Last updated: January 2024</p>
          </div>

          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Wiznovy's platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
            <div className="highlight">
              <p>These terms constitute a legally binding agreement between you and Wiznovy Global.</p>
            </div>
          </div>

          <div className="terms-section">
            <h2>2. Service Description</h2>
            <p>
              Wiznovy provides an online platform connecting students with qualified tutors and educational professionals. Our services include:
            </p>
            <ul>
              <li>Tutor matching and booking services</li>
              <li>Educational marketplace for learning resources</li>
              <li>Communication tools for learning sessions</li>
              <li>Payment processing and transaction management</li>
              <li>Quality assurance and support services</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. User Accounts and Registration</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              To access our services, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
            <h3>3.2 Account Responsibilities</h3>
            <ul>
              <li>You must be at least 18 years old or have parental consent</li>
              <li>Provide truthful and accurate information</li>
              <li>Maintain the security of your login credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. User Conduct and Responsibilities</h2>
            <p>
              All users must adhere to our community standards and conduct guidelines:
            </p>
            <ol>
              <li>Treat all users with respect and professionalism</li>
              <li>Provide honest and accurate information in profiles and communications</li>
              <li>Respect intellectual property rights</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Report any inappropriate behavior or content</li>
            </ol>
            <div className="highlight">
              <p>Violation of these conduct standards may result in account suspension or termination.</p>
            </div>
          </div>

          <div className="terms-section">
            <h2>5. Payment Terms and Policies</h2>
            <h3>5.1 Payment Processing</h3>
            <p>
              All payments are processed securely through our platform. We accept major credit cards, debit cards, and other approved payment methods.
            </p>
            <h3>5.2 Fees and Charges</h3>
            <p>
              Wiznovy charges a service fee for facilitating connections between students and tutors. All fees are clearly displayed before transaction completion.
            </p>
            <h3>5.3 Refund Policy</h3>
            <p>
              Refunds are handled on a case-by-case basis according to our refund policy. Requests must be submitted within 48 hours of the session.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. We collect, use, and protect your personal information in accordance with our Privacy Policy. By using our services, you consent to our data practices as outlined in our Privacy Policy.
            </p>
            <ul>
              <li>We implement industry-standard security measures</li>
              <li>Personal information is never sold to third parties</li>
              <li>You have the right to access and modify your data</li>
              <li>We comply with applicable data protection regulations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>7. Intellectual Property Rights</h2>
            <p>
              All content, trademarks, and intellectual property on the Wiznovy platform are owned by Wiznovy Global or our licensors. Users retain ownership of their original content but grant us a license to use it for platform operations.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              Wiznovy provides the platform "as is" and makes no warranties regarding the quality of tutoring services or educational outcomes. Our liability is limited to the amount paid for services in the preceding 12 months.
            </p>
            <div className="highlight">
              <p>We are not liable for indirect, incidental, or consequential damages arising from platform use.</p>
            </div>
          </div>

          <div className="terms-section">
            <h2>9. Termination</h2>
            <p>
              Either party may terminate this agreement at any time. Wiznovy reserves the right to suspend or terminate accounts for violations of these terms or for any reason with appropriate notice.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of the applicable arbitration association. The governing law shall be that of our jurisdiction.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Users will be notified of significant changes via email or platform notification. Continued use of the platform constitutes acceptance of modified terms.
            </p>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>If you have questions about these Terms and Conditions, please contact us:</p>
            <p>Email: <a href="mailto:legal@wiznovy.com">legal@wiznovy.com</a></p>
            <p>Phone: <a href="tel:+1-555-0123">+1 (555) 012-3456</a></p>
            <p>Address: Wiznovy Global, 123 Education Street, Learning City, LC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;