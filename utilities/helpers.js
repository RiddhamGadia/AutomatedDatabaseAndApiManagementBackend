const moment = require("moment");
const jwt = require("jsonwebtoken");
const validator = require("validator");

let utils = (module.exports = {
  stringValue: (s) => {
    let dataType = typeof s;
    if (dataType === "undefined") {
      return false;
    }
    if (s === null) {
      return false;
    }
    if (s === undefined) {
      return false;
    }
    if (dataType === "string") {
      return s.length >= 1;
    }
    return false;
  },
  getCurrentTime: () => {
    return moment().utcOffset(330).format("YYYY-MM-DDTHH:mm:ss.SSS");
  },
  numberValue: (n) => {
    let dataType = typeof n;
    if (dataType === "undefined") {
      return false;
    }
    if (n === null) {
      return false;
    }
    if (n === undefined) {
      return false;
    }
    if (dataType === "string" || dataType === "number") {
      if (!isNaN(n)) {
        return true;
      }
    }
    return false;
  },
  checkNullUndefined: (v) => {
    let dataType = typeof v;
    if (dataType === "undefined") {
      return false;
    }
    if (v === null) {
      return false;
    }
    if (v === undefined) {
      return false;
    }
    return true;
  },
  jwtAuthentication: (req, res, next) => {
    try {
      if (utils.checkNullUndefined(req.headers.authorization.split(" ")[1])) {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const id = decodedToken.id;
        if (!utils.stringValue(id) || !utils.stringValue(req.body.id)) {
          res.status(401).json({
            code: 0,
            error: "ID or token is not a string",
          });
        } else if (req.body.id && req.body.id !== id) {
          res.status(401).json({
            code: 10,
            error: "Invalid request!",
          });
        } else {
          next();
        }
      }
    } catch {
      res.status(401).json({
        code: 0,
        error: new Error("Invalid request!"),
      });
    }
  },
  arrayValue: (a) => {
    let dataType = typeof a;
    if (dataType === "undefined") {
      return false;
    }
    if (a === null) {
      return false;
    }
    if (a === undefined) {
      return false;
    }
    if (a instanceof Array) {
      if (a.length < 1) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  },
  email: (a) => {
    let dataType = typeof a;
    if (dataType === "undefined") {
      return false;
    }
    if (a === null) {
      return false;
    }
    if (a === undefined) {
      return false;
    }
    if (validator.isEmail(a)) {
      return true;
    }
    return false;
  },
});
