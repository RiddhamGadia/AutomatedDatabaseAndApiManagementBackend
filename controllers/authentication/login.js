const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!helpers.stringValue(email) || !helpers.stringValue(password)) {
      res.status(400).json({
        code: 0,
        message: "Email or password is not a string",
      });
    } else {
      const user = await User.findOne({ email }).lean();

      if (!user) {
        res.status(404).json({
          code: 0,
          message: "User not found",
        });
      }

      if (await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
          code: 1,
          message: "Login Successful",
          uid: user._id,
        });
      } else {
        return res.status(400).json({
          code: 0,
          message: "Wrong password",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = login;
