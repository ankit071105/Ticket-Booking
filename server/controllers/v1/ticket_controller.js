import Ticket from '../../models/Ticket.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';  
import { ApiError } from '../../utils/ApiError.js';      
import { ApiResponse } from '../../utils/ApiResponse.js';

// Buy Ticket Function
export const buyTicket = asyncHandler(async (req, res) => {
    const { ticketType, dateOfJourney, timeOfJourney, departure, destination } = req.body;
    const userEmail = req.email;
  
    const ticket = new Ticket({
      userEmail,
      ticketType,
      dateOfJourney,
      timeOfJourney,
      departure,
      destination,
    });
  
    const savedTicket = await ticket.save();
  
    res.status(201).json(new ApiResponse('Ticket purchased successfully', savedTicket)); // Use ApiResponse for consistency
});
  
// View Ticket History Function
export const viewTicketHistory = asyncHandler(async (req, res) => {
    const userEmail = req.email;
  
    const tickets = await Ticket.find({ userEmail }).sort({ createdAt: -1 });
  
    if (!tickets || tickets.length === 0) {
      throw new ApiError(404, 'No tickets found for this user'); // Use ApiError for error handling
    }
  
    res.status(200).json(new ApiResponse('Ticket history fetched successfully', tickets)); // Use ApiResponse for consistency
});
  