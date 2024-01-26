const crypto = require("crypto");
const showError = require("../utils/showError");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const Order = require("../models/order_schema");
const User = require("../models/user_schema");
const Payment = require("../models/payment_schema");
const Ticket = require("../models/ticket_schema");

let instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const id = jwt.decode(token)?.user.id;
		const user = await User.findOne({
			_id: id,
		});
		const options = {
			amount: 100,
			currency: "INR",
			receipt: shortid.generate(),
			notes: {
				username: user.username,
			},
		};
		const data = await instance.orders.create(options);
		const order = new Order({
			username: data.notes.username,
			orderId: data.id,
			amount: data.amount,
		});
		await order.save();
		return res.status(200).json({
			order,
			message: "Order created successfully",
		});
	} catch (err) {
		showError(err, res);
	}
};

const verifyPayment = async (req, res) => {
	function makeid(length) {
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		var val = Math.floor(1000 + Math.random() * 9000);
		result += `-${val}`;
		return result;
	}
	try {
		// getting the details back from our font-end
		const {
			orderCreationId,
			razorpay_payment_id,
			razorpay_order_id,
			razorpay_signature,
		} = req.body;
		const token = req.headers.authorization.split(" ")[1];
		const id = jwt.decode(token)?.user.id;
		const user = await User.findOne({
			_id: id,
		});
		// Creating our own digest
		// The format should be like this:
		// digest = hmac_sha256(orderCreationId + "|" + razorpay_payment_id, secret);
		const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

		shasum.update(`${orderCreationId}|${razorpay_payment_id}`);

		const digest = shasum.digest("hex");

		// comaparing our digest with the actual signature
		if (digest !== razorpay_signature)
			return res.status(400).json({
				msg: "Payment Failed : Signature Mismatch!",
				orderId: null,
				paymentId: null,
				success: false,
			});

		// THE PAYMENT IS LEGIT & VERIFIED
		// YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

		const payment = new Payment({
			username: user.username,
			orderId: orderCreationId,
			razorpay_payment_id,
			razorpay_order_id,
			razorpay_signature,
		});
		payment.save();
		user.attempts += 3;
		const ticket = makeid(4);
		const _ticket = new Ticket({
			ticketID: ticket,
			payment: {
				verified: true,
				paymentId: razorpay_payment_id,
			},
			userID: user._id,
		});
		await _ticket.save();
		// User.findOneAndUpdate(
		//     { username: user.username },
		//     { $push: { tickets: { id: ticket } } }
		// );
		user.ticketsPurchased.tickets.push({ id: ticket });
		await user.save();
		res.status(200).json({
			msg: "success",
			orderId: razorpay_order_id,
			paymentId: razorpay_payment_id,
			success: true,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createOrder,
	verifyPayment,
};

/*
    Order response
    {
        "id": "order_DBJOWzybf0sJbb",
        "entity": "order",
        "amount": 50000,
        "amount_paid": 0,
        "amount_due": 39900,
        "currency": "INR",
        "receipt": "order_rcptid_11",
        "status": "created",
        "attempts": 0,
        "notes": [],
        "created_at": 1566986570
    }
*/
/*
    Checkout Response  
    {
        "razorpay_payment_id": "pay_29QQoUBi66xm2f",
        "razorpay_order_id": "order_9A33XWu170gUtm",
        "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
    }
*/
