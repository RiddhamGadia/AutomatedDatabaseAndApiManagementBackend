const User = require("../../models/user");
const helpers = require("../../utilities/helpers");
const jwt = require("jsonwebtoken");

const genAuthToken = async (req, res) => {
  try {
    const { id } = req.body;
    if (!helpers.stringValue(id)) {
      res.status(400).json({
        code: 0,
        message: "ID is not in correct format",
      });
    } else {
      const user = await User.findOne({ _id: id }).lean();
      if (!user) {
        res.status(400).json({
          code: 0,
          message: "ID does not exist",
        });
      }
      const token = jwt.sign(
        {
          id: id,
          username: user.name,
        },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({
        code: 1,
        token: token,
        message: "Success",
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = genAuthToken;
