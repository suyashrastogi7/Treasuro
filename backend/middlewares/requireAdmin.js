/*
 *this is the middleware for authorization and preventing from routing without the registration
 */
const Admin = require("../models/admin_schema");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "You must be logged in as Admin",
        });
    }
    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_TOKEN, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: "You must be logged in as Admin",
            });
        }

        const {
            user: { id },
        } = payload;

        Admin.findById(id)
            .select("-password")
            .select("-timestamp")
            .select("-__v")
            .select("-image")
            .then((userData) => {
                if (!userData) {
                    return res.status(400).json({
                        error: "You need to be logged-in",
                    });
                }
                req.user = userData;
                next();
            })
            .catch((error) => {
                console.log(error.message);
                return res.status(404).json({
                    error: "You need to be logged in",
                });
            });
    });
};
