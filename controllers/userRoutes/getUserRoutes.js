const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const getUserRoute = async (req, res) => {
  const { id } = req.body;
  if (!helpers.stringValue(id)) {
    res.status(400).json({
      code: 0,
      message: "Invalid ID",
    });
  } else {
    const user = await User.findOne({
      _id: id,
    });
    res.status(200).json({
      code: 1,
      routes: user.routeData,
      message: "Sent Successfully",
    });
  }
};

module.exports = getUserRoute;
