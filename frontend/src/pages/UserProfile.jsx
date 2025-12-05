import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');

    if (!storedEmail) {
      navigate('/');
    } else {
      setEmail(storedEmail);
      setName(storedName || 'Guest');
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '15px' }}>
        <h2 className="text-center mb-4" style={{ color: '#901137' }}>User Profile</h2>
        <div className="mb-3">
          <label className="form-label text-muted"><strong>Name:</strong></label>
          <p className="fs-5">{name}</p>
        </div>
        <div className="mb-3">
          <label className="form-label text-muted"><strong>Email:</strong></label>
          <p className="fs-5">{email}</p>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-dark px-4" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
