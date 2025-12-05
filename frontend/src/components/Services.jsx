import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import cosmetic from '../assets/Images/image1.jpg';
import implants from '../assets/Images/image2.jpg';
import ortho from '../assets/Images/image3.jpg';

const services = [
  { title: "Cosmetic Dentistry", img: cosmetic, desc: "Enhance your smile with professional cosmetic procedures.", link: "/cosmetic" },
  { title: "Dental Implants", img: implants, desc: "State-of-the-art implants for natural-looking teeth.", link: "/dentalimplants" },
  { title: "Orthodontics", img: ortho, desc: "Align and straighten teeth for a perfect smile.", link: "/ortho" },
];

const Services = () => (
  <section id="services" style={{ backgroundColor: 'black', color: 'white', padding: '50px 0' }}>
    <style>{`
      .marquee-wrapper {
        overflow: hidden;
        position: relative;
        width: 100%;
      }

      .marquee-content {
        display: inline-block;
        white-space: nowrap;
        animation: scroll-left 40s linear infinite;
      }

      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .service-card {
        background-color: #1c1c1c;
        color: white;
        border: none;
        margin: 0 10px;
        min-width: 400px;  /* Increased minimum width */
        max-width: 450px;  /* Increased maximum width */
        display: inline-block;
        vertical-align: top;
        transition: transform 0.3s ease;
      }

      .service-card:hover {
        transform: translateY(-5px);
      }

      .service-card img {
        height: 300px; /* Increased height */
        object-fit: cover;
        width: 100%;  /* Keep width as 100% */
      }

      .card-body {
        padding: 15px;
      }

      h2 {
        margin-bottom: 30px;
      }
    `}</style>

    <div className="container text-center mb-5">
      <h2>Our Services</h2>
    </div>

    <div className="marquee-wrapper">
      <div className="marquee-content">
        {[...services, ...services].map((s, i) => (
          <a href={s.link} key={i} style={{ textDecoration: 'none', display: 'inline-block' }}>
            <div className="card service-card">
              <img src={s.img} className="card-img-top" alt={s.title} />
              <div className="card-body">
                <h5 className="card-title">{s.title}</h5>
                <p className="card-text">{s.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
