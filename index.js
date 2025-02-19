const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manikandansitpl3@gmail.com", // Gmail Address
    pass: "mjnl bejx pmix izvw", // App Password (not your actual password)
  },
});

// Send Email API Endpoint
app.post("/sendmail", async (req, res) => {
  const {
    to,
    subject,
    message,
    name,
    location,
    phone,
    gender,
    consultationType,
    date,
    time,
  } = req.body;

  if (
    !to ||
    !subject ||
    !message ||
    !name ||
    !location ||
    !phone ||
    !gender ||
    !consultationType ||
    !date ||
    !time
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required!" });
  }

  try {
    const emailContent = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Consultation Type:</strong> ${consultationType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;

    const info = await transporter.sendMail({
      from: `"New Appointment" <techytoper@gmail.com>`,
      to,
      subject,
      text: `Name: ${name}\nLocation: ${location}\nPhone: ${phone}\nGender: ${gender}\nConsultation Type: ${consultationType}\nDate: ${date}\nTime: ${time}\n\nMessage: ${message}`, // Plain text version
      html: emailContent, // HTML version
    });

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
