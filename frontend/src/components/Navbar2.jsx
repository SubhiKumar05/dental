import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(true);
  };

  return (
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
            <li className="nav-item"><a className="nav-link text-white" href="/" onClick={closeNavbar}>Services</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/" onClick={closeNavbar}>About Us</a></li>
            
            <li className="nav-item">
              <Link className="nav-link text-white" to="/testimonials" onClick={closeNavbar}>Testimonials</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signup" onClick={closeNavbar}>Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signin" onClick={closeNavbar}>Sign In</Link>
            </li>
            <li className="nav-item"><a className="nav-link text-white" href="/" onClick={closeNavbar}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
