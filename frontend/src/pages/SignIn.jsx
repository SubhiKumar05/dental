import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/Images/image11.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      navigate("/landing", { replace: true }); 
    }
  }, [navigate]);

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://dental-backend-one.vercel.app/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

     if (response.ok) {
  alert(data.message);
  localStorage.setItem("userEmail", data.user.email); 
  localStorage.setItem("userName", data.user.name);   
  navigate("/landing", { replace: true });
}
 else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while connecting to the server. Please try again later.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Sign In</h2>
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
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            className="btn mt-3"
            style={styles.btn}
            onMouseOver={(e) => (e.target.style.backgroundColor = "black")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#901137")}
          >
            Sign In
          </button>
          <div className="text-center mt-3">
            <a href="/forgot" style={{ color: "black" }}>
              Forgot Password?
            </a>
          </div>
          <div className="text-center mt-2">
            <a href="/signup" style={{ color: "black" }}>
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
