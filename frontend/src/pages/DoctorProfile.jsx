import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://dental-backend-one.vercel.app/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBook = (doctor) => {
    const appointmentData = {
      doctorId: doctor._id, 
      doctorName: doctor.name,
      service: doctor.service,
      message: `Requesting appointment with ${doctor.name} for ${doctor.specialization}`,
    };

    sessionStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    navigate('/form');
  };

  return (
    <div className="container-fluid py-5" style={styles.pageBackground}>
      <div className="container">
        <h2 className="text-center mb-5" style={styles.heading}>
          Meet Our <span style={styles.underline}>Dental Experts</span>
        </h2>
        <div className="row">
          {doctors.map((doc) => (
            <div className="col-md-6 col-lg-4 mb-4" key={doc._id}>
              <div className="card h-100 shadow doctor-card">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="card-title text-primary fw-bold">{doc.name}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{doc.specialization}</h6>
                    <p className="card-text mt-3">
                      <strong>Available:</strong><br />
                      {doc.availability.map((slot, idx) => (
                        <span key={idx}>{slot.day}: {slot.startTime} - {slot.endTime}<br /></span>
                      ))}
                    </p>
                  </div>
                  <button
                    className="btn mt-4"
                    style={styles.button}
                    onClick={() => handleBook(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '700',
    color: '#901137',
    animation: 'fadeIn 1s ease-in-out',
  },
  underline: {
    borderBottom: '4px solid #901137',
    display: 'inline-block',
    paddingBottom: '5px',
  },
  button: {
    backgroundColor: '#901137',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '8px',
    padding: '10px 20px',
    transition: 'all 0.3s ease',
  },
};


const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  .doctor-card {
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    border: 2px solid transparent;
  }
  .doctor-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(144, 17, 55, 0.2);
    border-color: #901137;
  }
  .doctor-card .btn:hover {
    background-color: #6d0e2e;
    transform: scale(1.05);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default DoctorProfile;
