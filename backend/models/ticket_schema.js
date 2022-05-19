const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketID: { type: String, required: true },
  payment: {
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentID: { type: String },
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Ticket = mongoose.model("ticket", ticketSchema);

export default Ticket;
