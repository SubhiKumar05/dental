import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import AppointmentForm from '../pages/AppointmentForm'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import Testimonials from '../pages/Testimonialpage'
import DentalImplants from '../pages/DentalImplantPage'
import CosmeticDentistry from '../pages/CosmeticDentistryPage'
import Orthodontics from '../pages/OrthodonticsPage'
import LandingPage from '../pages/LandingPage';
import UserProfile from '../pages/UserProfile';
import DoctorProfile from '../pages/DoctorProfile';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/form" element={<AppointmentForm />} />
    <Route path="/reset" element={<ResetPassword />} />
    <Route path="/forgot" element={<ForgotPassword />} />
    <Route path="/testimonials" element={<Testimonials />} />
    <Route path="/dentalimplants" element={<DentalImplants />} />
    <Route path="/cosmetic" element={<CosmeticDentistry />} />
    <Route path="/ortho" element={<Orthodontics />} />
    <Route path="/landing" element={<LandingPage />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/doctor" element={<DoctorProfile />} />


    {/* Add more routes here */}
  </Routes>
);

export default AppRoutes;
