// Initialize empty ticket array in localStorage if not already set
if (!localStorage.getItem('tickets')) {
  localStorage.setItem('tickets', JSON.stringify([]));
}

// Handle bus ticket submission
document.getElementById('busTicketForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const ticketNumber = document.getElementById('ticketNumber').value;
  const busName = document.getElementById('busName').value;
  const departureLocation = document.getElementById('departureLocation').value;
  const arrivalLocation = document.getElementById('arrivalLocation').value;
  const departureTime = document.getElementById('departureTime').value;
  const date = document.getElementById('date').value;
  const seatNumber = document.getElementById('seatNumber').value;
  const price = parseFloat(document.getElementById('price').value);

  // Calculate seller's deduction and buyer's added fee
  const sellerAmount = price - 50;  // ₹50 deduction for seller
  const buyerPrice = price + 100;   // ₹100 added for buyer

  // Create ticket object
  const ticket = {
    name,
    phone,
    email,
    ticketNumber,
    busName,
    departureLocation,
    arrivalLocation,
    departureTime,
    date,
    seatNumber,
    price,
    sellerAmount,
    buyerPrice,
    type: 'bus',
  };

  // Store the ticket in localStorage
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  tickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(tickets));

  // Show confirmation message to seller
  document.getElementById('sellerMessage').textContent = `Your bus ticket is listed! You will receive ₹${sellerAmount} after sale.`;
  document.getElementById('busTicketForm').reset();
});

// Handle train ticket submission
document.getElementById('trainTicketForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const ticketNumber = document.getElementById('ticketNumber').value;
  const trainNumber = document.getElementById('trainNumber').value;
  const departureLocation = document.getElementById('departureLocation').value;
  const arrivalLocation = document.getElementById('arrivalLocation').value;
  const departureTime = document.getElementById('departureTime').value;
  const date = document.getElementById('date').value;
  const coachType = document.getElementById('coachType').value;
  const acClass = document.getElementById('acClass').value;
  const seatNumber = document.getElementById('seatNumber').value;
  const price = parseFloat(document.getElementById('price').value);

  // Calculate seller's deduction and buyer's added fee
  const sellerAmount = price - 50;  // ₹50 deduction for seller
  const buyerPrice = price + 100;   // ₹100 added for buyer

  // Create ticket object
  const ticket = {
    name,
    phone,
    email,
    ticketNumber,
    trainNumber,
    departureLocation,
    arrivalLocation,
    departureTime,
    date,
    coachType,
    acClass,
    seatNumber,
    price,
    sellerAmount,
    buyerPrice,
    type: 'train',
  };

  // Store the ticket in localStorage
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  tickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(tickets));

  // Show confirmation message to seller
  document.getElementById('sellerMessage').textContent = `Your train ticket is listed! You will receive ₹${sellerAmount} after sale.`;
  document.getElementById('trainTicketForm').reset();
});

// Display tickets in the buy.html page
function displayTickets(type) {
  const ticketContainer = document.getElementById('ticketContainer');
  ticketContainer.innerHTML = '';  // Clear previous tickets

  // Retrieve tickets from localStorage
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

  // Filter tickets by type (bus or train)
  const filteredTickets = tickets.filter(ticket => ticket.type === type);

  if (filteredTickets.length === 0) {
    ticketContainer.innerHTML = `<p>No ${type} tickets available.</p>`;
  } else {
    filteredTickets.forEach(ticket => {
      const ticketCard = document.createElement('div');
      ticketCard.classList.add('ticket-card');

      // Common ticket details
      ticketCard.innerHTML = `
        <h3>${type === 'bus' ? 'Bus Ticket' : 'Train Ticket'}</h3>
        <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
        <p><strong>Seller Name:</strong> ${ticket.name}</p>
        <p><strong>Contact:</strong> ${ticket.phone} | ${ticket.email}</p>
        <p><strong>Departure:</strong> ${ticket.departureLocation}</p>
        <p><strong>Arrival:</strong> ${ticket.arrivalLocation}</p>
        <p><strong>Departure Time:</strong> ${ticket.departureTime}</p>
        <p><strong>Date:</strong> ${ticket.date}</p>
        <p><strong>Seat Number:</strong> ${ticket.seatNumber}</p>
        <p><strong>Original Price:</strong> ₹${ticket.price}</p>
        <p><strong>Price for Buyer:</strong> ₹${ticket.buyerPrice}</p>
      `;

      // Add additional info specific to bus or train
      if (type === 'bus') {
        ticketCard.innerHTML += `<p><strong>Bus Name:</strong> ${ticket.busName}</p>`;
      } else if (type === 'train') {
        ticketCard.innerHTML += `
          <p><strong>Train Number:</strong> ${ticket.trainNumber}</p>
          <p><strong>Coach Type:</strong> ${ticket.coachType}</p>
          ${ticket.acClass ? `<p><strong>AC Class:</strong> ${ticket.acClass}</p>` : ''}
        `;
      }

      ticketContainer.appendChild(ticketCard);
    });
  }
}

// Event listeners for the filter buttons in buy.html
document.getElementById('showBusTickets')?.addEventListener('click', () => {
  document.getElementById('ticketTypeHeader').textContent = 'Available Bus Tickets';
  displayTickets('bus');
});

document.getElementById('showTrainTickets')?.addEventListener('click', () => {
  document.getElementById('ticketTypeHeader').textContent = 'Available Train Tickets';
  displayTickets('train');
});

// Show bus tickets by default when the buy.html page loads
window.onload = () => {
  displayTickets('bus');
};
