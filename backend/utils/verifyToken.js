const UserToken = require("../models/token_schema");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refresh) => {
    const privateKey = process.env.JWT_SECRET_REFRESH;
    return new Promise((resolve, reject) => {
        try {
            UserToken.findOne({ token: refresh }, (err, doc) => {
                if (!doc)
                    return reject({
                        error: true,
                        message: "Invalid refresh token",
                    });

                jwt.verify(refresh, privateKey, (err, token) => {
                    if (err)
                        return reject({
                            error: true,
                            message: "Invalid refresh token",
                        });
                    resolve({
                        token,
                        error: false,
                        message: "Valid refresh token",
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }
    });
};

module.exports = {
    verifyToken: verifyRefreshToken,
};
