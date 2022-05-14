// Routes for logged in user's profile
const getProfile = (req, res) => {
  return res.status(200).json({ user: req.user });
};
module.exports = {
  getProfile,
};
