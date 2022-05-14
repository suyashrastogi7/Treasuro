const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");

const { purchaseTicket } = require("../controllers/ticket.controller");

/**
 * @route   POST /api/ticket/purchase
 * @access  Private
 * @desc    Purchase a  ticket
 */

router.post("/purchase", requireLogin, purchaseTicket);

/**
 * @route   POST /api/ticket/all
 * @access  Admin
 * @desc    View all  ticket
 */

router.get("/all", requireAdmin, purchaseTicket);

/**
 * @route   POST /api/ticket/:ticketID
 * @access  Admin
 * @desc    View single ticket information
 */

router.get("/:ticketID", requireAdmin, getTicketDetails);

/**
 * @route   POST /api/ticket/undef
 * @access  Admin
 * @desc    Obtain an unassigned ticket
 */

router.get("/undef", requireAdmin, getUnassignedTicket);
