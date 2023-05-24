const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const mongoose = require("mongoose");

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
});

app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT || 2000;

const frontendRouter = require("./routes/frontendRoutes");
app.use("/api/frontend", frontendRouter);

const apiRouter = require("./routes/apiRoutes");
app.use("/api", apiRouter);

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("DB Connection active");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, function () {
  console.log("Server is up and running on port " + PORT);
});
