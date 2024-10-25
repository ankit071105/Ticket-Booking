// Constants for price calculations and form validation
const CONSTANTS = {
  SELLER_DEDUCTION: 50,
  BUYER_ADDED_FEE: 100,
  REQUIRED_FIELDS: ['name', 'phone', 'email', 'ticketNumber']
};

// Initialize localStorage with a wrapper class for better error handling
class StorageManager {
  static getTickets() {
    try {
      return JSON.parse(localStorage.getItem('tickets')) || [];
    } catch (error) {
      console.error('Error reading tickets from storage:', error);
      return [];
    }
  }

  static saveTickets(tickets) {
    try {
      localStorage.setItem('tickets', JSON.stringify(tickets));
      return true;
    } catch (error) {
      console.error('Error saving tickets to storage:', error);
      return false;
    }
  }
}

// Initialize storage on page load
if (!localStorage.getItem('tickets')) {
  StorageManager.saveTickets([]);
}

// Form validation with more detailed error messages
function validateFormData(data) {
  const missingFields = CONSTANTS.REQUIRED_FIELDS.filter(field => !data[field]);
  if (missingFields.length > 0) {
    alert(`Please fill out the following required fields: ${missingFields.join(', ')}`);
    return false;
  }
  return true;
}

// Ticket class for better organization and type checking
class Ticket {
  constructor(formData, type) {
    this.type = type;
    this.name = formData.name;
    this.phone = formData.phone;
    this.email = formData.email;
    this.ticketNumber = formData.ticketNumber;
    this.departureStation = formData.departureStation;
    this.arrivalStation = formData.arrivalStation;
    this.departureTime = formData.departureTime;
    this.date = formData.date;
    this.seatNumber = formData.seatNumber;
    this.price = parseFloat(formData.price);
    this.sellerAmount = this.price - CONSTANTS.SELLER_DEDUCTION;
    this.buyerPrice = this.price + CONSTANTS.BUYER_ADDED_FEE;
    
    // Add type-specific details
    if (type === 'bus') {
      this.busName = formData.busName;
    } else if (type === 'train') {
      this.trainNumber = formData.trainNumber;
      this.category = formData.category;
      this.Class1 = formData.Class1;
    }
  }
}

// Form handling with improved error handling and validation
function handleTicketSubmission(formId, type) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));
    
    if (!validateFormData(formData)) return;

    const ticket = new Ticket(formData, type);
    const tickets = StorageManager.getTickets();
    tickets.push(ticket);

    if (StorageManager.saveTickets(tickets)) {
      const sellerMessage = document.getElementById('sellerMessage');
      if (sellerMessage) {
        sellerMessage.textContent = `Your ${type} ticket is listed! You will receive ₹${ticket.sellerAmount} after sale.`;
      }
      form.reset();
    } else {
      alert('Error saving ticket. Please try again.');
    }
  });
}

// Improved ticket display with template literal function
function createTicketHTML(ticket) {
  const commonHTML = `
    <h3>${ticket.type === 'bus' ? 'Bus Ticket' : 'Train Ticket'}</h3>
    <p><strong>PNR Number:</strong> ${ticket.ticketNumber}</p>
    <p><strong>Seller Name:</strong> ${ticket.name}</p>
    <p><strong>Contact:</strong> ${ticket.phone} | ${ticket.email}</p>
    <p><strong>Departure Station:</strong> ${ticket.departureStation}</p>
    <p><strong>Arrival Station:</strong> ${ticket.arrivalStation}</p>
    <p><strong>Departure Time:</strong> ${ticket.departureTime}</p>
    <p><strong>Date:</strong> ${ticket.date}</p>
    <p><strong>Seat Number:</strong> ${ticket.seatNumber}</p>
    <p><strong>Original Price:</strong> ₹${ticket.price}</p>
    <p><strong>Price for Buyer:</strong> ₹${ticket.buyerPrice}</p>
  `;

  const typeSpecificHTML = ticket.type === 'bus'
    ? `<p><strong>Bus Name:</strong> ${ticket.busName}</p>`
    : `
      <p><strong>Train Number:</strong> ${ticket.trainNumber}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Class:</strong> ${ticket.Class1}</p>
    `;

  return commonHTML + typeSpecificHTML;
}

function displayTickets(type) {
  const ticketContainer = document.getElementById('ticketContainer');
  if (!ticketContainer) return;

  ticketContainer.innerHTML = '';
  const tickets = StorageManager.getTickets().filter(ticket => ticket.type === type);

  if (tickets.length === 0) {
    ticketContainer.innerHTML = `<p>No ${type} tickets available.</p>`;
    return;
  }

  tickets.forEach(ticket => {
    const ticketCard = document.createElement('div');
    ticketCard.classList.add('ticket-card');
    ticketCard.innerHTML = createTicketHTML(ticket);
    ticketContainer.appendChild(ticketCard);
  });
}

// Event listeners with null checks
function initializeEventListeners() {
  const busButton = document.getElementById('showBusTickets');
  const trainButton = document.getElementById('showTrainTickets');
  const ticketTypeHeader = document.getElementById('ticketTypeHeader');

  busButton?.addEventListener('click', () => {
    if (ticketTypeHeader) ticketTypeHeader.textContent = 'Available Bus Tickets';
    displayTickets('bus');
  });

  trainButton?.addEventListener('click', () => {
    if (ticketTypeHeader) ticketTypeHeader.textContent = 'Available Train Tickets';
    displayTickets('train');
  });
}

// Initialize forms and display
handleTicketSubmission('busTicketForm', 'bus');
handleTicketSubmission('trainTicketForm', 'train');
initializeEventListeners();

// Show bus tickets by default when the buy.html page loads
window.addEventListener('load', () => displayTickets('bus'));