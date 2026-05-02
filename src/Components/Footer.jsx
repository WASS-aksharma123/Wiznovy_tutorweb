import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGooglePlay, FaApple } from "react-icons/fa";
import "../assets/Styles/Footer.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTutorPages } from "../services/pageservice";
import { getPublicSettings } from "../services/settingsService";

export default function Footer() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchPages();
    fetchSettings();
  }, []);

  const fetchPages = async () => {
    try {
      const result = await getTutorPages();
      if (result.success) {
        setPages(result.pages);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const result = await getPublicSettings();
      if (result.success) {
        setSettings(result.settings);
      } else {
        // Use default settings if API fails
        setSettings({
          companyName: 'WIZNOVY® Global Inc.',
          companyYear: '2025'
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      // Use default settings on error
      setSettings({
        companyName: 'WIZNOVY® Global Inc.',
        companyYear: '2025'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* For Clients */}
          <div className="footer__section">

            <h3>For Students</h3>


            <ul>
              <Link to='https://user-qa.wiznovy.com/search'>
                <li>Find a Tutor</li>
              </Link>
              <Link to='/all-courses'>
                <li>Browse Courses</li>
              </Link>
              <Link to='https://user-qa.wiznovy.com/library'>
                <li>Open Library</li>
              </Link>
              <Link to='/how-to-find-work'>
                <li>How it Works</li>
              </Link>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="footer__section">
            <h3>For Tutors</h3>
            <ul>
              <Link to='/signup'>
                <li>Become a Tutor</li>
              </Link>
              <Link to='/worldwide-find'>
                <li>How Tutor Works</li>
              </Link>
              <Link to='/support'>
                <li>Tutor FAQ</li>
              </Link>
              <Link to='/'>
                <li>Tutor Login</li>
              </Link>

            </ul>
          </div>

          {/* Resources */}
          <div className="footer__section">
            <h3>Resources</h3>
            <ul>
              <Link to='/support'>
                <li>Help & support</li>
              </Link>
              <Link to="/support">
                <li>FAQ</li>
              </Link>

            </ul>
          </div>

          {/* Company */}
          <div className="footer__section">
            <h3>Company</h3>
            <ul>
              <Link to='/about'>
                <li>About us</li>
              </Link>

              <Link to='/contact'>
                <li>Contact us</li>
              </Link>
              <Link to='/leadership'>
                <li>Privacy Policy</li>
              </Link>
              <Link to='/careers'>
                <li>Terms of Service</li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="backendpages">
          <div className="termsPolicy">
            {
              pages.map((page) => (
                <Link
                  key={page.id}
                  to="/general-backend"
                  state={{ pageData: page }}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <p className="Titlesss">{page.title}</p>
                </Link>
              ))
            }

          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider div2">

          {/* Follow Us */}
          {/* <div className="footer__social">
            <span>Follow us</span>
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div> */}

          {/* Mobile App */}
          {/* <div className="footer__mobile">
            <span>Mobile app</span>
            <FaApple />
            <FaGooglePlay />
          </div> */}
        </div>
        <div className="footer__divider">
          <div className="copy">
            © 2015 - {settings.companyYear || '2025'} {settings.companyName || 'WIZNOVY® Global Inc.'}
          </div>


        </div>
      </div>
    </footer>
  );
}
