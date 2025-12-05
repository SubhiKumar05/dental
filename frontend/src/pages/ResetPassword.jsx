import React, { useState } from "react";
import bgImage from "../assets/Images/image11.jpg"; 
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  event.preventDefault();

  setPasswordError("");
  setConfirmPasswordError("");

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    setPasswordError(
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    );
    return;
  }

  if (password !== confirmPassword) {
    setConfirmPasswordError("Passwords do not match.");
    return;
  }

  const email = localStorage.getItem("resetEmail");

  try {
    const res = await fetch("http://localhost:5000/resetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setPassword("");
      setConfirmPassword("");
      navigate("/signin"); // navigate after successful reset
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong. Please try again later.");
  }
};


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
    btn: {
      backgroundColor: "#901137",
      color: "white",
      border: "none",
      width: "100%",
    },
    btnHover: {
      backgroundColor: "black",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            {passwordError && <div style={styles.error}>{passwordError}</div>}
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
            {confirmPasswordError && (
              <div style={styles.error}>{confirmPasswordError}</div>
            )}
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

export default ResetPassword;
