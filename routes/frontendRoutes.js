const app = require("express")();
const register = require("../controllers/authentication/register");
const login = require("../controllers/authentication/login");
const genAuthToken = require("../controllers/authentication/genAuthToken");
const addDb = require("../controllers/userRoutes/addDb");
const addTable = require("../controllers/userRoutes/addTable");
const addTableData = require("../controllers/userRoutes/addTableData");
const viewDbs = require("../controllers/userRoutes/viewDbs");
const getApiKey = require("../controllers/userRoutes/getApiKey");
const createRoute = require("../controllers/userRoutes/createRoute");
const getUserRoutes = require("../controllers/userRoutes/getUserRoutes");
const getTableData = require("../controllers/userRoutes/getTableData");
const helpers = require("../utilities/helpers");

app.post("/register", register);
app.post("/login", login);
app.post("/genAuthToken", genAuthToken);
app.post("/addNewDatabase", helpers.jwtAuthentication, addDb);
app.post("/addNewTable", helpers.jwtAuthentication, addTable);
app.post("/updateData", helpers.jwtAuthentication, addTableData);
app.post("/viewDbs", helpers.jwtAuthentication, viewDbs);
app.post("/getApiKey", helpers.jwtAuthentication, getApiKey);
app.post("/createApiRoute", helpers.jwtAuthentication, createRoute);
app.post("/getUserRoutes", helpers.jwtAuthentication, getUserRoutes);
app.post("/getTableData", helpers.jwtAuthentication, getTableData);

module.exports = app;
