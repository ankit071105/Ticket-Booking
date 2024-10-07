// Constants for price calculations
const SELLER_DEDUCTION = 50;
const BUYER_ADDED_FEE = 100;

// Initialize empty ticket array in localStorage if not already set
if (!localStorage.getItem('tickets')) {
  localStorage.setItem('tickets', JSON.stringify([]));
}

// Function to validate form data
function validateFormData(data) {
  if (!data.name || !data.phone || !data.email || !data.ticketNumber || !data.ticketNumber) {
    alert("Please fill out all required fields.");
    return false;
  }
  return true;
}

// Common ticket submission handler
function handleTicketSubmission(formId, type) {
  document.getElementById(formId)?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const ticketNumber = document.getElementById('ticketNumber').value;
    const departureStation = document.getElementById('departureStation').value;
    const arrivalStation = document.getElementById('arrivalStation').value;
    const departureTime = document.getElementById('departureTime').value;
    const date = document.getElementById('date').value;
    const seatNumber = document.getElementById('seatNumber').value;
    const price = parseFloat(document.getElementById('price').value);

    // Validate form data
    if (!validateFormData({ name, phone, email, ticketNumber })) {
      return;
    }

    let additionalDetails = {};

    // Specific data for train or bus
    if (type === 'bus') {
      additionalDetails.busName = document.getElementById('busName').value;
    } else if (type === 'train') {
      additionalDetails.trainNumber = document.getElementById('trainNumber').value;
      additionalDetails.category = document.getElementById('category').value;
      additionalDetails.Class1 = document.getElementById('Class1').value;
    }

    // Calculate seller's deduction and buyer's added fee
    const sellerAmount = price - SELLER_DEDUCTION;
    const buyerPrice = price + BUYER_ADDED_FEE;

    // Create ticket object
    const ticket = {
      name,
      phone,
      email,
      ticketNumber,
      departureStation,
      arrivalStation,
      departureTime,
      date,
      seatNumber,
      price,
      sellerAmount,
      buyerPrice,
      type,
      ...additionalDetails,
    };

    // Store the ticket in localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets'));
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Show confirmation message
    document.getElementById('sellerMessage').textContent = `Your ${type} ticket is listed! You will receive ₹${sellerAmount} after sale.`;
    document.getElementById(formId).reset();
  });
}

// Initialize the event listeners
handleTicketSubmission('busTicketForm', 'bus');
handleTicketSubmission('trainTicketForm', 'train');

// Display tickets in the buy.html page
function displayTickets(type) {
  const ticketContainer = document.getElementById('ticketContainer');
  ticketContainer.innerHTML = ''; // Clear previous tickets

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
        <p><strong>PNR Number:</strong> ${ticket.ticketNumber}</p>
        <p><strong>Seller Name:</strong> ${ticket.name}</p>
        <p><strong>Contact:</strong> ${ticket.phone} | ${ticket.email}</p>
        <p><strong>Departure Station:</strong> ${ticket.departureStation}</p>
        <p><strong>Arrival Station:</strong> ${ticket.arrivalStation}</p>
        <p><strong>Departure Time:</strong> ${ticket.departureTime}</p>
        <p><strong>Class:</strong> ${ticket.Class1}</p>
        <p><strong>Category:</strong> ${ticket.category}</p>
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
