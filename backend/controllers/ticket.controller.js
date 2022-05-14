const Ticket = require("../models/ticket_schema");
const User = require("../models/user_schema");

const purchaseTicket = async (req, res) => {
  try {
    const { id: userID, paymentID } = req.user;

    const _ticket = await Ticket.findOneAndUpdate(
      { userID: null },
      {
        $set: { userID, paymentID },
      },
      {
        returnNewDocument: true,
      }
    );

    // After successful purchase of ticket increase the attempts by 3

    const _user = await User.findById(userID);
    _user.attempts += 3;
    _user.ticketsPurchased.push(_ticket.id);
    await _user.save();

    res.status(200).json({
      ticket: _ticket,
    });
  } catch (err) {
    next(err);
  }
};

const getAllTicketDetails = async (req, res, next) => {
  const tickets = await Ticket.find().populate("User");
  res.status(200).json({
    tickets,
  });
};

const getTicketDetails = async (req, res, next) => {
  try {
    const { ticketID } = req.body;
    const foundTicket = await Ticket.findOne({ ticketID });

    if (!foundTicket) {
      res.status(400).json({
        success: false,
        message: "Ticket ID Invalid",
      });
    }

    res.status(200).json({
      ticket: foundTicket,
    });
  } catch (err) {
    next(err);
  }
};

const getUnassignedTicket = async (req, res, next) => {
  const ticket = await Ticket.findOne({ userID: null });
  res.status(200).json({
    ticket,
  });
};

module.exports = {
  purchaseTicket,
  getAllTicketDetails,
  getTicketDetails,
  getUnassignedTicket,
};
