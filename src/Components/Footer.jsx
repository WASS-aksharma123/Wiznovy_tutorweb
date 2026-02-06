import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGooglePlay, FaApple } from "react-icons/fa";
import "../assets/Styles/Footer.scss"
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* For Clients */}
          <div className="footer__section">
            <Link to='/services'>
              <h3>For Clients</h3>
            </Link>

            <ul>
              <li>How to hire</li>
              <li>Talent Marketplace</li>
              <li>Project Catalog</li>
              <li>Hire an agency</li>
            </ul>
          </div>

          {/* For Talent */}
          <div className="footer__section">
            <h3>For Talent</h3>
            <ul>
              <li>Work with ads</li>
              <li>Worldwide Find</li>
              <li>Find freelance jobs</li>
              <li>Direct Contracts</li>
              <li>How to find work</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__section">
            <h3>Resources</h3>
            <ul>
              <li>Help & support</li>
              <li>Success stories</li>
              <li>Blog & Affiliate programme</li>
              <li>Free Business</li>
              <li>Tools Release notes</li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer__section">
            <h3>Company</h3>
            <ul>
              <Link to='/about'>
                <li>About us</li>
              </Link>
              <li>Leadership</li>
              <li>Careers</li>
              <li>Our impact</li>
              <Link to='/contact'>
                <li>Contact us</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider div2">

          {/* Follow Us */}
          <div className="footer__social">
            <span>Follow us</span>
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div>

          {/* Mobile App */}
          <div className="footer__mobile">
            <span>Mobile app</span>
            <FaApple />
            <FaGooglePlay />
          </div>
        </div>
        <div className="footer__divider">
          <div className="copy">
            © 2015 - 2025 WIZNONVY® Global Inc.
          </div>
          <div className="termsPolicy">
            <Link to="/terms">
              <p>Terms of Service</p>
            </Link>
            <Link to="/terms">
              <p>Privacy Policy</p>
            </Link>
            <Link to="/terms">
              <p>Notice</p>
            </Link>
            <Link to="/terms">
              <p>Settings Accessibility</p>
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
}
