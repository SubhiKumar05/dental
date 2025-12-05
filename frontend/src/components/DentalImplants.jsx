import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import heroImage1 from '../assets/Images/image9.jpg';
import heroImage2 from '../assets/Images/image15.jpg';
import heroImage3 from '../assets/Images/image16.jpg';
import procedureImage from '../assets/Images/image17.jpg';

const ToothImplantation = () => {
  const navigate = useNavigate();

   
  const handleBookAppointment = () => {
    const user = localStorage.getItem('user'); 
    if (user) {
      navigate('/form'); 
    } else {
      alert('Please sign in to book an appointment.');
      navigate('/signin'); 
    }
  };

  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');
    const heroImages = document.querySelectorAll('.bg-img');

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroSection.getBoundingClientRect();
      const centerX = clientX - left - width / 2;
      const centerY = clientY - top - height / 2;

      heroImages.forEach((image, index) => {
        const depth = (index + 1) * 8;
        const moveX = (centerX / width) * depth;
        const moveY = (centerY / height) * depth;
        image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
        image.style.transition = 'transform 0.1s ease-out';
      });
    };

    const resetTransform = () => {
      heroImages.forEach((image) => {
        image.style.transform = 'translate(0px, 0px) scale(1)';
        image.style.transition = 'transform 0.5s ease-out';
      });
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', resetTransform);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', resetTransform);
    };
  }, []);

  return (
    <>
      <style>
        {`
          body {
            animation: fadeInPage 2s ease-in-out;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          @keyframes fadeInPage {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .hero-section {
            position: relative;
            height: 100vh;
            overflow: hidden;
            background-color: #000;
            cursor: pointer;
          }

          .bg-img {
            position: absolute;
            object-fit: cover;
            z-index: 0;
            opacity: 0.8;
            border-radius: 20px;
            transition: transform 0.3s ease-out;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            animation: zoomIn 1.5s ease-in-out;
          }

          .main-img { top: 0; left: 0; width: 100%; height: 100%; opacity: 0.5; }
          .overlay-img1 { top: 10%; left: 5%; width: 35%; transform: rotate(-5deg); animation: slideInFromLeft 2s ease-in-out; }
          .overlay-img2 { bottom: 10%; right: 5%; width: 35%; transform: rotate(5deg); animation: slideInFromRight 2s ease-in-out; }

          @keyframes slideInFromLeft {
            from { transform: translateX(-100%) rotate(-5deg); opacity: 0; }
            to { transform: translateX(0) rotate(-5deg); opacity: 1; }
          }

          @keyframes slideInFromRight {
            from { transform: translateX(100%) rotate(5deg); opacity: 0; }
            to { transform: translateX(0) rotate(5deg); opacity: 1; }
          }

          .hero-section::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3));
            z-index: 0;
          }

          .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            padding: 0 20px;
            animation: fadeInUp 2s ease;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animated-gradient-text {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(90deg, #ffdde1, #ee9ca7, #ffdde1);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: moveGradient 4s ease infinite, fadeInDown 1.2s ease;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .hero-text {
            font-size: 1.5rem;
            margin-top: 18px;
            color: #f0f0f0;
            font-style: italic;
            animation: fadeInUp 1.5s ease-in-out;
          }

          .hero-button {
            background-color: #fff;
            border: none;
            color: #901137;
            padding: 14px 32px;
            border-radius: 30px;
            font-weight: 600;
            margin-top: 25px;
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
            transition: all 0.35s ease;
            animation: fadeInUp 2s ease;
          }

          .hero-button:hover {
            background-color: #f8d7da;
            color: #901137;
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(255, 255, 255, 0.35);
            animation: pulse 0.7s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          .section {
            padding: 80px 20px;
            animation: fadeIn 1.5s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .section h3 {
            color: #901137;
          }

          .service-img {
            width: 100%;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            animation: zoomIn 1.5s ease-in-out;
          }

          .zoom-in { animation: zoomIn 1.5s ease-in-out; }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .cta-section {
            background-color: #901137;
            color: white;
            padding: 80px 20px;
            text-align: center;
            border-radius: 0;
            animation: slideInFromBottom 2s ease-in-out;
          }

          @keyframes slideInFromBottom {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .cta-section button {
            background-color: white;
            color: #901137;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-weight: bold;
            transition: 0.3s;
          }

          .cta-section button:hover {
            background-color: #f8d7da;
            color: #901137;
            transform: scale(1.05);
          }

          .tooth-style-section {
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            padding: 60px 20px;
            color: #fff;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }

          .tooth-style-section h3 {
            font-size: 2rem;
            text-align: center;
            color: #901137;
            margin-bottom: 20px;
          }

          .tooth-style-section h5 {
            font-size: 1.5rem;
            text-align: center;
            color: #000000;
            margin-bottom: 20px;
          }

          .tooth-style-section p {
            font-size: 1rem;
            text-align: center;
            font-style: italic;
            color: #000000;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage1} alt="Main" className="bg-img main-img" />
        <img src={heroImage2} alt="Overlay 1" className="bg-img overlay-img1" />
        <img src={heroImage3} alt="Overlay 2" className="bg-img overlay-img2" />
        <div className="hero-content">
          <h1 className="animated-gradient-text">Tooth Implantation</h1>
          <p className="hero-text">Restore your smile with advanced, natural-looking dental implants</p>
          <Button onClick={handleBookAppointment} className="hero-button">Get Started</Button>
        </div>
      </div>

      {/* Service Section */}
      <Container className="section">
        <Row className="align-items-center">
          <Col md={6}>
            <img src={procedureImage} alt="Implant Procedure" className="service-img" />
          </Col>
          <Col md={6} className="zoom-in">
            <h3>Why Choose Tooth Implants?</h3>
            <p>
              Tooth implants are designed to last and offer unmatched stability. They’re anchored directly into your jawbone for a secure, long-term fit.
            </p>
            <ul>
              <li>Preserves bone and facial structure</li>
              <li>Restores functionality and appearance</li>
              <li>Supports natural speech and comfort</li>
              <li>Durable and low-maintenance</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* How the Procedure Works Section */}
      <Container className="tooth-style-section">
        <h3>How the Procedure Works</h3>
        <Row>
          <Col md={4}>
            <h5>1. Consultation & Imaging</h5>
            <p>
              We begin with a full dental evaluation and advanced imaging to determine bone structure and ideal placement.
            </p>
          </Col>
          <Col md={4}>
            <h5>2. Implant Placement</h5>
            <p>
              The dental implant is placed into the jawbone, acting as a new root for the tooth.
            </p>
          </Col>
          <Col md={4}>
            <h5>3. Healing & Restoration</h5>
            <p>
              After healing, a custom crown is attached to the implant for a natural look.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h3>Ready to restore your smile?</h3>
        <Button onClick={handleBookAppointment} className="cta-section button">
          Book Appointment for Consultation
        </Button>
      </div>
    </>
  );
};

export default ToothImplantation;
