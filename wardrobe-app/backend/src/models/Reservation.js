import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: String, required: true },
  qrCode: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);
