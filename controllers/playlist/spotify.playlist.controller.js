const { default: axios } = require("axios");
const qs = require("qs");
const User = require("../../models/user.model");

async function getSpotifyPlaylist(req, res) {
  await axios
    .get(`https://api.spotify.com/v1/playlists/${req.headers.id}`, {
      headers: {
        Authorization: "Bearer " + req.headers.access_token,
      },
    })
    .then((response) => {
      const tracks = response.data.tracks.items.map((e) => {
        return e.track.name;
      });

      res.status(200).json(tracks);
    })
    .catch(async (error) => {
      res.json(error);
    });
}

async function createSpotifyPlaylist(req, res) {
  await axios
    .post(
      `https://api.spotify.com/v1/users/${req.body.spotifyID}/playlists`,
      JSON.stringify({
        name: req.body.name,
      }),
      {
        headers: {
          Authorization: "Bearer " + req.body.access_token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
}

async function searchTrackSpotify(req, res) {
  await axios
    .get("https://api.spotify.com/v1/search", {
      params: {
        q: req.query.q,
        type: "track",
        limit: 1,
      },
      headers: {
        Authorization: "Bearer " + req.headers.access_token,
      },
    })
    .then((response) => {
      res.status(200).json(response.data.tracks.items[0].id);
    })
    .catch((error) => {
      res.json(error);
    });
}

async function addTrackstoSpotify(req, res) {
  const uris = req.body.uris.map((element) => {
    return `spotify:track:${element}`;
  });

  await axios
    .post(
      `https://api.spotify.com/v1/playlists/${req.body.playlistID}/tracks`,
      JSON.stringify({
        uris: uris,
        position: 0,
      }),
      {
        headers: {
          Authorization: "Bearer " + req.body.access_token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
}

module.exports = {
  createSpotifyPlaylist,
  addTrackstoSpotify,
  getSpotifyPlaylist,
  searchTrackSpotify,
};
