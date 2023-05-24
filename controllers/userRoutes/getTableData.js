const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const getTableData = async (req, res) => {
  try {
    const { id, dbId, tableId } = req.body;
    if (!helpers.stringValue(id)) {
      res.status(400).json({
        code: 0,
        error: "User ID is not valid",
      });
    } else {
      const user = await User.findOne(
        {
          _id: id,
        },
        "databases"
      );
      user.databases.forEach((database) => {
        if (database._id.equals(dbId)) {
          database.databaseDetails.forEach((table) => {
            if (table._id.equals(tableId)) {
              res.status(200).json({
                code: 1,
                data: table,
              });
            }
          });
        } else {
          res.status(400).json({
            code: 0,
            message: "Table not found",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error,
    });
  }
};

module.exports = getTableData;
