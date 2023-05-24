const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const addData = async (req, res) => {
  try {
    const { tableId, dbId, id, tableData } = req.body;
    if (!tableData) {
      res.status(400).json({
        code: 0,
        message: "User data does not exist",
      });
    } else {
      if (
        !helpers.stringValue(tableId) ||
        !helpers.stringValue(dbId) ||
        !helpers.stringValue(id) ||
        !helpers.arrayValue(tableData)
      ) {
        res.status(400).json({
          code: 0,
          error: "Table ID or Database ID or User ID is not a string",
        });
      } else {
        const user = await User.findOne(
          {
            _id: id,
          },
          "databases"
        );
        user.databases.forEach((db) => {
          if (db._id.equals(dbId)) {
            db.databaseDetails.forEach((dbs) => {
              if (dbs._id.equals(tableId)) {
                dbs.tableData = tableData;
              }
            });
          }
        });
        await User.findOneAndUpdate(
          {
            _id: id,
          },
          {
            databases: user.databases,
          }
        );
        res.status(200).json({
          code: 1,
          message: "Data Added Successfully",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error,
    });
  }
};

module.exports = addData;
