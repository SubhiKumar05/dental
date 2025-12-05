import React from 'react';
import video from '../assets/videos/video1.mp4';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      navigate('/form'); 
    } else {
      alert('Please sign in to book an appointment.');
      navigate('/signin'); 
    }
  };

  const style = {
    hero: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
    },
    video: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1,
    },
    btn: {
      backgroundColor: '#901137',
      color: 'white',
      border: 'none',
      animation: 'flash 1.5s infinite alternate',
      padding: '10px 20px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      cursor: 'pointer',
    },
  };

  return (
    <header style={style.hero}>
      <video autoPlay muted loop style={style.video}>
        <source src={video} type="video/mp4" />
      </video>
      <div>
        <h1>Creating Beautiful Smiles</h1>
        <p>Advanced and Affordable Dental Care</p>
        <button style={style.btn} onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </header>
  );
};

export default Hero;
