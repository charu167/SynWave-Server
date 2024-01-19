const router = require("express").Router();
const cors = require("cors");

//Importing Controllers
const {
  spotifyAuth,
  googleAuth,
  refreshSpotify,
  refreshYoutube,
} = require("../controllers/auth.controller");

router.post("/spotify", cors(), spotifyAuth);
router.post("/google", cors(), googleAuth);
router.post("/refreshSpotify", refreshSpotify);
router.post("/refreshYoutube", refreshYoutube);

module.exports = router;
