const User = require("../../models/user");
const helpers = require("../../utilities/helpers");
const { v4: uuidv4 } = require("uuid");

const getApiKey = async (req, res) => {
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
    if (user.apiKey) {
      res.status(200).json({
        code: 1,
        api: user.apiKey,
      });
    } else {
      const key = uuidv4();
      await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          apiKey: key,
        }
      );
      res.status(200).json({
        code: 1,
        api: key,
      });
    }
  }
};

module.exports = getApiKey;
