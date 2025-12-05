import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Images/image11.jpg';

const SignUp = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const [errors, setErrors] = useState({});
  
  const [serverErrors, setServerErrors] = useState({});
  
  const [isBtnHover, setIsBtnHover] = useState(false);

  const styles = {
    body: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      color: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0
    },
    container: {
      maxWidth: '400px',
      width: '100%',
      padding: '20px',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(15px)',
      border: '2px solid rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
    },
    btn: {
      backgroundColor: isBtnHover ? 'black' : '#901137', 
      color: 'white',
      border: 'none',
      width: '100%',
      padding: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    error: {
      color: 'red',
      fontSize: '0.9em',
      marginTop: '5px',
      textAlign: 'left'
    }
  };

  
  const handleChange = (e) => {
   
    setServerErrors({});
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  
  const validate = () => {
    const newErrors = {};

    
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email.';
    }

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long, including uppercase, lowercase, a number, and a special character.';
    }

    setErrors(newErrors);

    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Sign-up successful!");
        navigate("/signin");  
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
};

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              aria-describedby="nameError"
            />
            {/* Show client-side validation error */}
            {errors.name && <div id="nameError" style={styles.error}>{errors.name}</div>}
            {/* Show server-side validation error */}
            {serverErrors.name && <div style={styles.error}>{serverErrors.name}</div>}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="emailError"
            />
            {errors.email && <div id="emailError" style={styles.error}>{errors.email}</div>}
            {serverErrors.email && <div style={styles.error}>{serverErrors.email}</div>}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              aria-describedby="passwordError"
            />
            {errors.password && <div id="passwordError" style={styles.error}>{errors.password}</div>}
            {serverErrors.password && <div style={styles.error}>{serverErrors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn mt-3"
            style={styles.btn}
            onMouseEnter={() => setIsBtnHover(true)}
            onMouseLeave={() => setIsBtnHover(false)}
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <a href="/signin" style={{ color: 'black' }}>Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
