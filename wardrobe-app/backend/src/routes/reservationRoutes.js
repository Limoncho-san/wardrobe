import express from "express";
import QRCode from "qrcode";
import Reservation from "../src/models/Reservation.js";
import authMiddleware from "../src/middleware/authMiddleware.js";

const router = express.Router();

// PROTECTED: Create a reservation
router.post("/reserve", authMiddleware, async (req, res) => {
  try {
    const { event } = req.body;
    const userId = req.user.id; // Extracted from JWT

    const qrCodeData = `${userId}-${event}-${Date.now()}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    const reservation = await Reservation.create({ userId, event, qrCode: qrCodeImage });
    res.status(201).json({ message: "Reservation successful", qrCode: qrCodeImage });
  } catch (err) {
    res.status(500).json({ message: "Error creating reservation" });
  }
});

export default router;
