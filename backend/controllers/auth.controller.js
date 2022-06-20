const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");
const checkRegex = require("../middlewares/checkRegex");

const User = require("../models/user_schema");
const showError = require("../utils/showError.js");
const generateToken = require("../utils/generateToken");
const { cloudinary } = require("../utils/cloudinary");
const shortid = require("shortid");

const Razorpay = require("razorpay");

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const authUser = (req, res) => {
    const user = req.user;
    return res.status(200).json({
        user,
    });
};

const signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array(),
        });
    }

    try {
        let { name, username, password, rollno, phoneno, email, image } =
            req.body;

        const user = await User.findOne({
            $or: [{ username }, { email }, { phoneno }, { rollno }],
        });
        //id user exists return error
        if (user) {
            return res
                .status(400)
                .send({ message: "User with given details already exists" });
        }

        checkRegex({ rollno, phoneno }, res);

        const newUser = new User({
            name,
            username,
            password,
            rollno,
            phoneno,
            email,
        });

        // image

        const uploadedResponse = await cloudinary.uploader.upload(image, {
            folder: `treasuro-db-22/${newUser.name + "--" + newUser.rollno}`,
        });

        newUser.image = uploadedResponse.secure_url;

        // encrypt the password
        const salt = await bcrypt.genSalt(12);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        console.log(newUser);

        // generate jwt for user
        const token = generateToken(newUser);
        await newUser.save();

        return res.status(200).json({
            user: {
                name,
                username,
                email,
                image: uploadedResponse.secure_url,
            },
            token,
        });
    } catch (error) {
        showError(error, res);
    }
};

const signIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array(),
        });
    }
    let { emailOrUsername, password } = req.body;

    // emailOrUsername = emailOrUsername.toLowercase();

    try {
        // check user with email exist or not
        const user = await User.findOne({
            $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
        });

        if (!user) {
            return res.status(422).json({
                message: "User not registered",
            });
        }
        // match hash password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(422).json({
                message: "Invalid credentials",
            });
        }
        // generate token
        const token = generateToken(user);

        return res.status(200).json({
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                rollno: user.rollno,
                phoneno: user.phoneno,
                attempts: user.attempts,
                active: user.active,
                score: user.score,
                level: user.level,
                image: user.image,
            },
            token,
        });
    } catch (error) {
        showError(error, res);
    }
};

const handlePayment = async (req, res, next) => {
    const payment_capture = 1;
    const amount = 500;
    const currency = "INR";

    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            userID: req.user.id,
        },
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        next(err);
    }
};

const verifyPayment = (req, res) => {
    const SECRET = "99912345";

    const shasum = crypto.createHmac("sha256", SECRET);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(req.headers);

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log(digest, true);
        req.locals.paymentVerified = true;
    } else {
        console.log(digest, false);
        req.locals.paymentVerified = false;
    }

    console.log(req.body);
    res.status(200).json({
        status: "ok",
    });
};

module.exports = {
    signUp,
    signIn,
    authUser,
    handlePayment,
    verifyPayment,
};
