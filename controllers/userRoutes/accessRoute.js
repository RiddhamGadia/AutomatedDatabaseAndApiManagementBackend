const User = require("../../models/user");
const helpers = require("../../utilities/helpers");

const createRoute = async (req, res) => {
  const { apiKey, routeName } = req.body;
  if (!helpers.stringValue(apiKey) || !helpers.stringValue(routeName)) {
    res.status(400).json({
      code: 0,
      message: "Incorrect format",
    });
  } else {
    const user = await User.findOne({
      apiKey: apiKey,
    });
    if (user.routeData.length === 0) {
      res.status(200).json({
        code: 0,
        message: "Route Name not found",
      });
    } else {
      if (user.routeData.length !== 0) {
        user.routeData.forEach(async (routeData) => {
          if (routeData.routeName === routeName) {
            if (routeData.routeParams.type === "Read") {
              user.databases.forEach((database) => {
                if (database._id.equals(routeData.routeParams.dbId)) {
                  database.databaseDetails.forEach((table) => {
                    if (table._id.equals(routeData.routeParams.tableId)) {
                      res.status(200).json({
                        code: 1,
                        data: table.tableData,
                      });
                    }
                  });
                } else {
                  res.status(200).json({
                    code: 0,
                    message: "Database Not Found",
                  });
                }
              });
            } else if (routeData.routeParams.type === "Write") {
              if (!helpers.checkNullUndefined(req.body.row)) {
                res.status(200).json({
                  code: 0,
                  error: "Row parameter empty in an Add request",
                });
              } else {
                user.databases.forEach((db) => {
                  if (db._id.equals(routeData.routeParams.dbId)) {
                    db.databaseDetails.forEach((dbs) => {
                      if (dbs._id.equals(routeData.routeParams.tableId)) {
                        const tableData = dbs.tableData;
                        tableData.push(req.body.row);
                        dbs.tableData = tableData;
                      }
                    });
                  }
                });
                await User.findOneAndUpdate(
                  {
                    apiKey: apiKey,
                  },
                  {
                    databases: user.databases,
                  }
                );
                res.status(200).json({
                  code: 1,
                  message: "Data added",
                });
              }
            }
          }
        });
      } else {
        res.status(200).json({
          code: 0,
          message: "Route Name not found",
        });
      }
    }
  }
};

module.exports = createRoute;
