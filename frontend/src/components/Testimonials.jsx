import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';

const Testimonials = () => {
  return (
    <>
      <style>
        {`
          /* Fade-in and Slide-up effects */
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animated {
            animation-duration: 1s;
            animation-fill-mode: both;
          }

          .fadeInUp {
            animation-name: fadeInUp;
          }

          .slideIn {
            animation-name: slideIn;
          }

          .testimonial-item {
            animation: slideIn 1s ease-out;
          }

          .testimonial-item img {
            animation: fadeInUp 1s ease-out;
            max-width: 100%;
            height: auto;
          }

          .testimonial-item h4,
          .testimonial-item p {
            animation: fadeInUp 1.2s ease-out;
          }

          /* Increase size of the white container */
          .testimonial-container {
            padding: 50px 30px; /* Adjust padding */
            max-width: 1200px; /* Set max-width */
            margin: 0 auto; /* Center the container */
            background: rgba(255, 255, 255, 0.85); /* Light transparent background */
            border-radius: 10px; /* Rounded corners */
          }

          /* Custom styling for carousel arrows */
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            background-color: transparent; /* Transparent background */
            border: 2px solid #901137; /* Border for arrows */
            border-radius: 50%; /* Circular arrows */
          }

          /* Optional: Change hover effect on arrows */
          .carousel-control-prev-icon:hover,
          .carousel-control-next-icon:hover {
            background-color: #901137; /* Arrow background on hover */
            border-color: #a32e51; /* Darker border on hover */
          }

          /* Optional: Change size of arrows */
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 40px;
            height: 40px;
          }

          /* Styling the quote icons */
          .quote-icon {
            color: #901137;
            animation: fadeInUp 1s ease-out;
          }

          /* Adjust the position of the bottom carousel indicator (dots) */
          .carousel-indicators {
            bottom: -25px; /* Move the dots slightly down */
          }

          .carousel-indicators li {
            background-color: #901137; /* Customize the indicator color */
            border-radius: 50%; /* Circular dots */
          }

          .carousel-indicators .active {
            background-color: #a32e51; /* Active dot color */
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .testimonial-container {
              padding: 30px 15px;
            }
            .testimonial-item img {
              width: 120px;
              height: 120px;
            }
            .testimonial-item h4 {
              font-size: 1.2rem;
            }
            .testimonial-item p {
              font-size: 0.9rem;
            }
          }

          @media (max-width: 576px) {
            .testimonial-item img {
              width: 100px;
              height: 100px;
            }
            .testimonial-item h4 {
              font-size: 1rem;
            }
            .testimonial-item p {
              font-size: 0.85rem;
            }
          }
        `}
      </style>

      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="text-center mb-4 pb-2">
              <i className="fas fa-quote-left fa-3x quote-icon"></i>
            </div>
            <Card className="testimonial-container">
              <Card.Body className="px-4 py-5">
                <Carousel fade interval={4000}>
                  <Carousel.Item>
                    <Row className="justify-content-center">
                      <Col lg={10} xl={8}>
                        <Row className="testimonial-item">
                          <Col lg={6} className="d-flex justify-content-center mb-3 mb-lg-0">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                              className="rounded-circle shadow animated fadeInUp"
                              alt="Maria Smantha"
                              width="150"
                              height="150"
                            />
                          </Col>
                          <Col md={6} lg={6}>
                            <h4 className="mb-4 animated fadeInUp">Maria Smantha – Root Canal Treatment</h4>
                            <p className="animated fadeInUp">
                              “I was extremely nervous about getting a root canal, but the doctors here were
                              incredibly gentle and reassuring. The entire procedure was painless, and the staff
                              made sure I was comfortable throughout. Booking my appointment online was quick and
                              effortless. Highly recommend this clinic to anyone who fears the dentist!”
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Row className="justify-content-center">
                      <Col lg={10} xl={8}>
                        <Row className="testimonial-item">
                          <Col lg={6} className="d-flex justify-content-center mb-3 mb-lg-0">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                              className="rounded-circle shadow animated fadeInUp"
                              alt="Lisa Cudrow"
                              width="150"
                              height="150"
                            />
                          </Col>
                          <Col md={6} lg={6}>
                            <h4 className="mb-4 animated fadeInUp">Lisa Cudrow – Teeth Whitening</h4>
                            <p className="animated fadeInUp">
                              “I booked my whitening session through the website and was amazed by how smooth the
                              process was. The staff explained every step clearly, and the results were fantastic!
                              My teeth are several shades whiter, and I received follow-up reminders automatically
                              through the app. Excellent service and professionalism.”
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Row className="justify-content-center">
                      <Col lg={10} xl={8}>
                        <Row className="testimonial-item">
                          <Col lg={6} className="d-flex justify-content-center mb-3 mb-lg-0">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                              className="rounded-circle shadow animated fadeInUp"
                              alt="John Smith"
                              width="150"
                              height="150"
                            />
                          </Col>
                          <Col md={6} lg={6}>
                            <h4 className="mb-4 animated fadeInUp">John Smith – Dental Implants</h4>
                            <p className="animated fadeInUp">
                              “I needed dental implants after losing a tooth in an accident. The doctors were very
                              professional and took time to explain my options. The booking and follow-up system
                              made everything so organized. I’ve regained my confidence and smile again. Truly the
                              best dental experience I’ve ever had.”
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
            <div className="text-center mt-4 pt-2">
              <i className="fas fa-quote-right fa-3x quote-icon"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Testimonials;
