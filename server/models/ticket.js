import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  ticketType: {
    type: String,
    enum: ["Bus", "Train"], // Allows only "Bus" or "Train"
    required: true,
  },
  dateOfJourney: {
    type: Date,
    required: true,
  },
  timeOfJourney: {
    type: String,
    required: true,
    match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time in HH:MM format."],
  },
  departure: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
