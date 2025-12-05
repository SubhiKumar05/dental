import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure FontAwesome is imported

const Footer = () => (
  <footer className="footer" aria-label="Footer">
    <div className="container">
      {/* Branch Info */}
      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <h5>Main Branch</h5>
          <p>
            Pristine Pearls Dental Clinic<br />
            123 Smile Avenue, City Center, Metropolis
          </p>
          <p>
            Email: <a href="mailto:contact@pristinepearls.com" className="text-white">contact@pristinepearls.com</a><br />
            Phone: <a href="tel:+1234567890" className="text-white">+123 456 7890</a>
          </p>
        </div>
        <div className="col-md-6 mb-3">
          <h5>Other Branches</h5>
          <p>
            <strong>Branch 1:</strong> 45 Wellness Street<br />
            <strong>Branch 2:</strong> 78 Dental Lane<br />
            <strong>Branch 3:</strong> 90 Ortho Road
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="row text-center mt-4">
        <div className="col">
          <h5>Follow Us</h5>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white me-3"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white me-3"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-white"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4">
        <p>&copy; 2025 Pristine Pearls. All Rights Reserved.</p>
      </div>
    </div>

    {/* Footer Styles */}
    <style jsx>{`
      .footer {
        background-color: black;
        color: white;
        padding: 20px 0;
        text-align: center;
      }
      .footer a {
        color: white;
        text-decoration: none;
      }
      .footer a:hover {
        color: #f8d7da;
      }
    `}</style>
  </footer>
);

export default Footer;