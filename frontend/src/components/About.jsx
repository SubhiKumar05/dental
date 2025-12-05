import React from 'react';
import dentalTeam from '../assets/Images/image8.jpg'; 

const About = () => (
  <section id="about" className="about-section">
    <style>{`
      .about-section {
        background: #f8f9fa;
        color: #212529;
        padding: 4rem 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        text-align: left;
        overflow: hidden;
      }
      .about-text {
        max-width: 600px;
        animation: slideInLeft 1s ease forwards;
      }
      .about-text h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      .about-text p {
        font-size: 1.1rem;
        line-height: 1.7;
      }
      .about-image {
        max-width: 400px;
        flex-shrink: 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: zoomIn 1s ease forwards;
      }
      .about-image img {
        width: 100%;
        height: auto;
        display: block;
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes zoomIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }

      @media (max-width: 768px) {
        .about-section {
          flex-direction: column;
          text-align: center;
        }
        .about-text {
          text-align: center;
        }
      }
    `}</style>

    <div className="about-text">
      <h2>About Us</h2>
      <p>
        At Pristine Pearls, we believe that a healthy, radiant smile is the key to confidence and well-being.
        Our clinic is dedicated to providing exceptional dental care with advanced technology and a patient-first approach.
        With a team of experienced professionals, we specialize in cosmetic dentistry, dental implants, orthodontics,
        and comprehensive oral health services. We prioritize comfort, precision, and personalized treatments tailored
        to each patient’s unique needs. Your journey to a perfect smile begins here—where expertise meets excellence.
      </p>
    </div>

    <div className="about-image">
      <img src={dentalTeam} alt="Dental Team" />
    </div>
  </section>
);

export default About;
