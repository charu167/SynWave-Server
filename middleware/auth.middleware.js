const jwt = require("jsonwebtoken");

//Importing db models
const User = require("../models/user.model");

async function authMiddleware(req, res, next) {
  next();
}

module.exports = { authMiddleware };
