const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const viewDbs = async (req, res) => {
  try {
    const { id } = req.body;
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
      const data = [];
      user.databases.forEach((db) => {
        const name = db.databaseName;
        const dbId = db._id;
        const tableData = [];

        db.databaseDetails.forEach((table) => {
          tableData.push({
            tableName: table.tableName,
            tableId: table._id,
          });
        });
        data.push({
          dbName: name,
          dbId: dbId,
          tableData: tableData,
        });
      });
      res.status(200).json({
        code: 1,
        message: "Success",
        dbs: data,
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 0,
      error,
    });
  }
};

module.exports = viewDbs;
