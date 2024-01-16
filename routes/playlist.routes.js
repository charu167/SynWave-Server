const router = require("express").Router();

//Importing Controllers
const {
  createSpotifyPlaylist,
  addTrackstoSpotify,
  getSpotifyPlaylist,
  searchTrackSpotify,
} = require("../controllers/playlist/spotify.playlist.controller");

const {
  getYoutubePlaylist,
  createYoutubePlaylist,
  addTrackstoYoutube,
  searchTrack,
} = require("../controllers/playlist/youtube.playlist.controller");

//Importing Middleware
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/spotify", getSpotifyPlaylist);
router.post("/spotify/create", createSpotifyPlaylist);
router.get("/spotify/search", searchTrackSpotify);
router.post("/spotify/addTracks", addTrackstoSpotify);

router.get("/youtube", getYoutubePlaylist);
router.post("/youtube/create", createYoutubePlaylist);
router.get("/youtube/search", searchTrack);
router.post("/youtube/addTracks", addTrackstoYoutube);

module.exports = router;
