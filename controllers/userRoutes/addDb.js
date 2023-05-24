const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const addDb = async (req, res) => {
  try {
    const { dbDetails, id } = req.body;
    if (!dbDetails) {
      res.status(400).json({
        code: 0,
        error: "DB details missing",
      });
    } else {
      const dbName = dbDetails.name;
      if (!helpers.stringValue(dbName)) {
        res.status(400).json({
          code: 0,
          error: "DB Name is not a String",
        });
      } else {
        const user = await User.findOne(
          {
            _id: id,
          },
          "databases"
        );
        var flag = 0;
        user.databases.forEach((database) => {
          if (database.databaseName === dbName) {
            flag = 1;
          }
        });
        if (flag === 0) {
          user.databases.push({
            databaseName: dbDetails.name,
          });
          await User.findOneAndUpdate(
            {
              _id: id,
            },
            {
              databases: user.databases,
            }
          );
        }
        const user2 = await User.findOne(
          {
            _id: id,
          },
          "databases"
        );
        var dbId = "";
        user2.databases.forEach((database) => {
          if (database.databaseName === dbName) {
            dbId = database._id;
          }
        });
        res.status(200).json({
          code: 1,
          message: "DB Added Successfully",
          dbId: dbId,
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

module.exports = addDb;
