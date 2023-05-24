const app = require("express")();

const accessRoute = require("../controllers/userRoutes/accessRoute");

app.post("/userApi", accessRoute);

module.exports = app;
