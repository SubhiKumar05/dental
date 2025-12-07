const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dentalapp";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    preloadDoctors();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// ====== SCHEMAS ======
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  service: String,
  availability: [
    {
      day: String, // "Mon", "Tue", etc.
      startTime: String, // "HH:MM"
      endTime: String,   // "HH:MM"
    },
  ],
});
const Doctor = mongoose.model("Doctor", doctorSchema);

const appointmentSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  doctorName: String,
  service: String,
  userName: String,
  userEmail: String,
  date: String, // "YYYY-MM-DD"
  time: String, // "HH:MM"
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

// ====== ROUTES ======

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign In
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      message: "Sign-in successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Reset Password
app.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Book Appointment with validation
app.post("/appointment", async (req, res) => {
  const { doctorId, doctorName, service, userName, userEmail, date, time } = req.body;

  if (!doctorId || !userName || !userEmail || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get day of week from date
    const appointmentDay = new Date(date).toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Mon"

    // Match day with availability
    const availableSlot = doctor.availability.find(slot => slot.day === appointmentDay);

    if (!availableSlot) {
      return res.status(400).json({
        message: `Doctor is not available on ${appointmentDay}`,
      });
    }

    // Validate time within range
    const isTimeValid = time >= availableSlot.startTime && time <= availableSlot.endTime;

    if (!isTimeValid) {
      return res.status(400).json({
        message: `Doctor is available on ${appointmentDay} only between ${availableSlot.startTime} and ${availableSlot.endTime}`,
      });
    }

    // Prevent duplicate booking at same time
    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    if (existingAppointment) {
      return res.status(409).json({ message: "Doctor already has an appointment at this time" });
    }

    const appointment = new Appointment({
      doctorId,
      doctorName,
      service,
      userName,
      userEmail,
      date,
      time,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== PRELOAD DOCTORS ======
async function preloadDoctors() {
  const count = await Doctor.countDocuments();
  if (count > 0) return;

  const doctors = [
    {
      name: "Dr. Anjali Nair",
      specialization: "Cosmetic Dentistry",
      service: "Cosmetic Dentistry",
      availability: [
        { day: "Mon", startTime: "10:00", endTime: "14:00" },
        { day: "Wed", startTime: "10:00", endTime: "14:00" },
        { day: "Fri", startTime: "10:00", endTime: "14:00" },
      ],
    },
    {
      name: "Dr. Ravi Menon",
      specialization: "Orthodontics",
      service: "Orthodontics",
      availability: [
        { day: "Tue", startTime: "11:00", endTime: "16:00" },
        { day: "Thu", startTime: "11:00", endTime: "16:00" },
      ],
    },
    {
      name: "Dr. Meera Thomas",
      specialization: "Pediatric Dentistry",
      service: "Cosmetic Dentistry",
      availability: [
        { day: "Mon", startTime: "14:00", endTime: "18:00" },
        { day: "Tue", startTime: "14:00", endTime: "18:00" },
        { day: "Wed", startTime: "14:00", endTime: "18:00" },
        { day: "Thu", startTime: "14:00", endTime: "18:00" },
        { day: "Fri", startTime: "14:00", endTime: "18:00" },
      ],
    },
    {
      name: "Dr. Arun Das",
      specialization: "Dental Implants",
      service: "Dental Implants",
      availability: [
        { day: "Sat", startTime: "09:00", endTime: "13:00" },
        { day: "Sun", startTime: "09:00", endTime: "13:00" },
      ],
    },
    {
      name: "Dr. Sneha Pillai",
      specialization: "Endodontics",
      service: "Cosmetic Dentistry",
      availability: [
        { day: "Wed", startTime: "15:00", endTime: "18:00" },
        { day: "Fri", startTime: "15:00", endTime: "18:00" },
      ],
    },
  ];

  await Doctor.insertMany(doctors);
  console.log("✅ Doctors preloaded");
}

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});