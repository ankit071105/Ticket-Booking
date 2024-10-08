const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => {
            c.classList.remove('active');
        });
      
        card.classList.add('active');
    });
});