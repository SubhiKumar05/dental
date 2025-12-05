import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
    doctorId: '',
    doctorName: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = sessionStorage.getItem('appointmentData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData((prev) => ({ ...prev, ...parsed }));
    }

    // Clear any existing background styles
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctorId || !formData.doctorName) {
      alert("Missing doctor details. Please go back and select a doctor again.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/appointment', {
        doctorId: formData.doctorId,
        doctorName: formData.doctorName,
        service: formData.service,
        userName: formData.name,
        userEmail: formData.email,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        phone: formData.phone,
      });

      alert(response.data.message);
      sessionStorage.setItem('appointmentData', JSON.stringify(formData));
      navigate('/landing'); // Replace with your confirmation route
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div className="appointment-form">
      <div className="container mt-5" style={styles.container}>
        <h1 className="text-center mb-4">Book an Appointment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Selected Service</label>
            <input
              type="text"
              className="form-control"
              name="service"
              value={formData.service}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Time Slot</label>
            <select
              className="form-control"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              <option>09:00</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn w-100" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#901137',
    color: '#fff',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease'
  }
};

export default AppointmentForm;
