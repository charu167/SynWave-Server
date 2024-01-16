const router = require("express").Router();

//Importing Middlewares
const { authMiddleware } = require("../middleware/auth.middleware");

//Importing Controllers
const { getUser } = require("../controllers/user.controller");

router.get("/", authMiddleware, getUser);

module.exports = router;
