import React, { useState } from "react";
import bgImage from "../assets/Images/image11.jpg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const styles = {
    body: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      color: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
    },
    container: {
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(15px)",
      border: "2px solid rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    },
    btn: {
      backgroundColor: "#901137",
      color: "white",
      border: "none",
      width: "100%",
    },
    input: {
      background: "rgba(255, 255, 255, 0.3)",
      color: "black",
      border: "1px solid rgba(0, 0, 0, 0.5)",
    },
    error: {
      color: "red",
      fontSize: "0.9em",
      marginTop: "5px",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    
    localStorage.setItem("resetEmail", email);

    setError("");
    navigate(`/reset?email=${encodeURIComponent(email)}`);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            {error && <div style={styles.error}>{error}</div>}
          </div>
          <button
            type="submit"
            className="btn mt-3"
            style={styles.btn}
            onMouseOver={(e) => (e.target.style.backgroundColor = "black")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#901137")}
          >
            Reset Password
          </button>
          <div className="text-center mt-3">
            <a href="/signin" style={styles.link}>
              Back to Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
