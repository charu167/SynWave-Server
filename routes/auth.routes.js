const router = require("express").Router();
const cors = require("cors");

//Importing Controllers
const {
  spotifyAuth,
  googleAuth,
  refreshSpotify,
  refreshYoutube,
} = require("../controllers/auth.controller");

router.post("/spotify", spotifyAuth);
router.post("/google", googleAuth);
router.post("/refreshSpotify", refreshSpotify);
router.post("/refreshYoutube", refreshYoutube);

module.exports = router;
