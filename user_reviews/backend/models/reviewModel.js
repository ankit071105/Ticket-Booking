const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  eventId: { type: String, required: true, index: true }, // Add index here
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
