const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
  },
  databases: [
    {
      databaseName: String, //name
      databaseDetails: [
        //databaseDetails
        {
          tableName: String,
          tableColumns: [
            {
              columnName: String,
              columnConstraint: String,
            },
          ],
          tableData: [],
        },
      ],
    },
  ],
  routeData: [
    {
      routeName: String,
      routeParams: Object,
    },
  ],
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
