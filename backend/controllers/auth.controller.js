const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const checkRegex = require("../middlewares/checkRegex");
// const { sendMail } = require("../utils/mail");

const User = require("../models/user_schema");

const showError = require("../utils/showError.js");
const generateToken = require("../utils/generateToken");
const { verifyToken } = require("../utils/verifyToken");
const { cloudinary } = require("../utils/cloudinary");

const refreshToken = async (req, res) => {
    const { refresh } = req.body;
    try {
        const verified = await verifyToken(refresh);
        if (verified.error)
            res.status(400).json({
                status: false,
                msg: "Invalid Token, Please sign in Again",
            });
        const payload = {
            user: {
                id: verified?.token.user.id,
            },
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "14m",
        });
        return res.status(200).json({
            token: accessToken,
        });
    } catch (err) {
        console.log(err);
    }
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
        await newUser.save();
        return res.status(200).json({
            success: true,
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

module.exports = {
    signUp,
    signIn,
    refreshToken,
};
