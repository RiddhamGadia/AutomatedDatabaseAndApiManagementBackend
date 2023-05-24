const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const addTable = async (req, res) => {
  try {
    const { tableName, dbId, id, tableColumns } = req.body;
    if (!tableName || !tableColumns) {
      res.status(400).json({
        code: 0,
        message: "Table Name does not exist",
      });
    } else {
      if (!helpers.stringValue(tableName) || !helpers.stringValue(dbId)) {
        res.status(400).json({
          code: 0,
          error: "Table Name or Database ID is not a String",
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
            db.databaseDetails.push({
              tableName: tableName,
              tableColumns: tableColumns,
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
        const user2 = await User.findOne(
          {
            _id: id,
          },
          "databases"
        );
        var tableId = "";
        user2.databases.forEach((db) => {
          if (db._id.equals(dbId)) {
            db.databaseDetails.forEach((table) => {
              if (table.tableName === tableName) {
                tableId = table._id;
              }
            });
          }
        });
        res.status(200).json({
          code: 1,
          message: "Table Added Successfully",
          tableId: tableId,
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

module.exports = addTable;
