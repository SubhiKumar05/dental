const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Create express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",   // update allowed domain later
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Mongo DB Safe Lazy Connect (for Vercel)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.log("❌ Missing MONGO_URI in environment variables");
    return;
  }

  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
  preloadDoctors();
}

// ====== SCHEMAS ======
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  service: String,
  availability: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],
});
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

const appointmentSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  doctorName: String,
  service: String,
  userName: String,
  userEmail: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now },
});
const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

// ====== ROUTES ======

// Register
app.post("/register", async (req, res) => {
  await connectDB();
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
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/signin", async (req, res) => {
  await connectDB();
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
    res.status(500).json({ message: "Server error" });
  }
});

// Get doctors
app.get("/doctors", async (req, res) => {
  await connectDB();
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password
app.post("/resetpassword", async (req, res) => {
  await connectDB();
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Book appointment
app.post("/appointment", async (req, res) => {
  await connectDB();
  const { doctorId, doctorName, service, userName, userEmail, date, time } =
    req.body;

  if (!doctorId || !userName || !userEmail || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointmentDay = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const availableSlot = doctor.availability.find(
      (slot) => slot.day === appointmentDay
    );

    if (!availableSlot) {
      return res
        .status(400)
        .json({ message: `Doctor not available on ${appointmentDay}` });
    }

    const isTimeValid =
      time >= availableSlot.startTime && time <= availableSlot.endTime;

    if (!isTimeValid) {
      return res.status(400).json({
        message: `Doctor available ${availableSlot.startTime}-${availableSlot.endTime}`,
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
    });
    if (existingAppointment) {
      return res.status(409).json({ message: "Slot unavailable" });
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
    res.status(201).json({ message: "Appointment booked" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get appointments
app.get("/appointments", async (req, res) => {
  await connectDB();
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ====== PRELOAD DOCTORS ======
async function preloadDoctors() {
  const count = await Doctor.countDocuments();
  if (count > 0) return;

  const doctors = [
    { name: "Dr. Anjali Nair", specialization: "Cosmetic Dentistry", service: "Cosmetic Dentistry",
      availability: [{ day: "Mon", startTime: "10:00", endTime: "14:00" }] },
    // (Other doctors omitted for brevity — keep yours here)
  ];

  await Doctor.insertMany(doctors);
  console.log("Doctors preloaded");
}

// === IMPORTANT: Serverless Export ===
module.exports = (req, res) => {
  return app(req, res);
};
