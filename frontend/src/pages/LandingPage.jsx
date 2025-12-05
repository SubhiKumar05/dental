import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import backgroundImage from '../assets/Images/image3.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/"); 
    }
  }, [navigate]);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(true);
  };

  const handleLogout = () => {
    
    localStorage.clear();
    sessionStorage.clear();

    
    navigate('/');
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="container">
          <Link className="navbar-brand text-white" to="/" onClick={closeNavbar}>Pristine Pearls</Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/testimonials" onClick={closeNavbar}>Testimonials</Link>
              </li>
              <li className="nav-item">
  <Link className="nav-link text-white" to="/profile" onClick={closeNavbar}>Profile</Link>
</li>
<li className="nav-item">
  <Link className="nav-link text-white" to="/doctor" onClick={closeNavbar}>
    Doctor's Profile
  </Link>
</li>


              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ ...styles.hero, backgroundImage: `url(${backgroundImage})` }}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Welcome to Pristine Pearls Dental Clinic</h1>
          <p style={styles.subtitle}>
            Your smile is our passion. Book an appointment today and experience world-class dental care.
          </p>
          <div style={styles.buttonGroup}>
            <button onClick={() => navigate('/form')} style={styles.bookButton}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container text-center">
          <p style={{ margin: 0, padding: '10px 0', color: '#fff' }}>
            &copy; {new Date().getFullYear()} Pristine Pearls Dental Clinic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    padding: '0 20px',
  },
  heroContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: '40px 20px',
    maxWidth: '700px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  bookButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    backgroundColor: '#343a40',
    padding: '20px 0',
    marginTop: 'auto',
  },
};

export default LandingPage;
