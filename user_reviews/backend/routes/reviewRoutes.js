const express = require('express');
const { createReview, getReviewsByEvent } = require('../controllers/reviewController');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Validation middleware
const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
];

// Route to create a review with validation
router.post('/', reviewValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createReview);

// Route to get reviews by eventId
router.get('/:eventId', getReviewsByEvent);

module.exports = router;
