const jwt = require("jsonwebtoken");
const Admin = require("../models/admin_schema");

export const signin = async (req, res, next) => {
  try {
    const { username, password, adminKey } = req.body;

    if (adminKey != process.env.ADMIN_KEY) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    const _user = await Admin.findOne({ username });

    if (!_user) {
      res.status(400).json({
        message: "User not registerd.",
      });
    }

    const isValid = await _user.isValidPassword(password);

    if (!isValid) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { username, password, adminKey } = req.body;

    if (adminKey != process.env.ADMIN_KEY) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    const _admin = new Admin({ username, password, adminKey });

    const newAdmin = await _admin.save();

    
  } catch (err) {
    next(err);
  }
};
