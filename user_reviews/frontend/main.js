document.addEventListener('DOMContentLoaded', () => {
    const reviewList = document.getElementById('review-list');
    const reviewForm = document.getElementById('new-review');
    const eventId = document.getElementById('event-id').value;
  
    // Fetch and display reviews
    fetch(`/api/reviews/${eventId}`)
      .then(response => response.json())
      .then(data => {
        const { reviews, averageRating } = data;
        document.getElementById('average-rating').textContent = `Average Rating: ${averageRating.toFixed(1)}/5`;
  
        if (reviews.length === 0) {
          reviewList.innerHTML = '<p>No reviews yet. Be the first to leave one!</p>';
        } else {
          reviews.forEach(review => {
            const li = document.createElement('li');
            li.textContent = `Rating: ${review.rating}, Comment: ${review.comment}`;
            reviewList.appendChild(li);
          });
        }
      })
      .catch(err => console.error('Error fetching reviews:', err));
  
    // Handle review form submission
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rating = document.getElementById('rating').value;
      const comment = document.getElementById('comment').value;
  
      // Simple frontend validation
      if (!rating || rating < 1 || rating > 5 || comment.trim() === '') {
        alert('Please provide a valid rating (1-5) and a non-empty comment.');
        return;
      }
  
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userId: 'user123', rating, comment })
      })
      .then(response => response.json())
      .then(review => {
        const li = document.createElement('li');
        li.textContent = `Rating: ${review.rating}, Comment: ${review.comment}`;
        reviewList.appendChild(li);
        reviewForm.reset();
      })
      .catch(err => console.error('Error submitting review:', err));
    });
  });
  