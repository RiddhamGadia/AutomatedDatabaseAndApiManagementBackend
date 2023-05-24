const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !helpers.stringValue(email) ||
      !helpers.stringValue(password) ||
      !helpers.stringValue(name)
    ) {
      res.status(400).json({
        code: 0,
        message: "Email or password or Name is in incorrect format",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      res.status(200).json({
        code: 1,
        message: "Success",
        id: user._id,
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = register;
