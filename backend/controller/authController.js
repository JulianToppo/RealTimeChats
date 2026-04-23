// controller/authController.js
const User = require("../model/user");

const loginUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  let user = await User.findOne({ username });

  if (!user) {
    user = await User.create({ username });
  }

  res.json(user);
};

module.exports = { loginUser };