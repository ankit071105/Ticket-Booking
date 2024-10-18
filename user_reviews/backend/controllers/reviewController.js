const Review = require('../models/reviewModel');

// Create a review
exports.createReview = async (req, res) => {
  const { eventId, userId, rating, comment } = req.body;
  try {
    const newReview = new Review({ eventId, userId, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Get all reviews for an event and calculate average rating
exports.getReviewsByEvent = async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.eventId });
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;
    res.status(200).json({ reviews, averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};
