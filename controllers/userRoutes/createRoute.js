const User = require("../../models/user");
const helpers = require("../../utilities/helpers");
const { v4: uuidv4 } = require("uuid");

const createRoute = async (req, res) => {
  const { dbId, tableId, id, type, databaseName, tableName, notes } = req.body;
  if (
    !helpers.stringValue(dbId) ||
    !helpers.stringValue(tableId) ||
    !helpers.stringValue(id) ||
    !helpers.stringValue(type)
  ) {
    res.status(400).json({
      code: 0,
      message: "Incorrect format",
    });
  } else {
    const user = await User.findOne({
      _id: id,
    });
    const routeName = uuidv4();
    const routeParams = {
      dbId: dbId,
      tableId: tableId,
      type: type,
      databaseName: databaseName,
      tableName: tableName,
      notes: notes,
    };
    const obj = {
      routeParams: routeParams,
      routeName: routeName,
    };
    user.routeData.push(obj);
    await User.findOneAndUpdate(
      {
        _id: id,
      },
      { routeData: user.routeData }
    );

    res.status(200).json({
      code: 1,
      routeName: routeName,
      message: "Success",
    });
  }
};

module.exports = createRoute;
