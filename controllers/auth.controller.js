const { default: axios } = require("axios");
const qs = require("qs");

//Importing db models
const User = require("../models/user.model");

//Importing utility functions
const { spotifyUserSave, googleUserSave } = require("../utility/auth.utility");

//Main controllers

//Getting access and refresh tokens from spotify and saving the user
async function spotifyAuth(req, res) {
  const code = req.body.code;
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.spotify_redirect_uri,
  };
  const fromattedData = qs.stringify(data);

  await axios
    .post("https://accounts.spotify.com/api/token", fromattedData, {
      headers: {
        Authorization: "Basic " + process.env.spotify_basic_auth_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(async (response) => {
      res.status(200).json({ spotifyAccessToken: response.data.access_token });
      await spotifyUserSave(
        response.data.access_token,
        response.data.refresh_token
      );
    })
    .catch((error) => {
      res.json(error);
    });
}

//Getting access and refresh tokens from google and saving the user
async function googleAuth(req, res) {
  const code = req.body.code;

  const data = {
    code: code,
    client_id: process.env.google_client_id,
    client_secret: process.env.google_client_secret,
    redirect_uri: process.env.google_redirect_uri,
    grant_type: "authorization_code",
  };

  const fromattedData = qs.stringify(data);

  await axios
    .post("https://oauth2.googleapis.com/token", fromattedData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(async (response) => {
      await googleUserSave(
        response.data.access_token,
        response.data.refresh_token
      );

      res.status(200).json({ googleAccessToken: response.data.access_token });
    })
    .catch((error) => res.json(error));
}

//Sptoify Token Refresh
async function refreshSpotify(req, res) {
  const user = await User.findOne({ spotifyID: req.body.spotifyID });

  await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: user.auth.spotifyRefreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + process.env.spotify_basic_auth_token,
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
}

//Google Token Refresh
async function refreshYoutube(req, res) {
  const user = await User.findOne({ spotifyID: req.body.spotifyID });

  await axios
    .post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        client_id: process.env.google_client_id,
        client_secret: process.env.google_client_secret,
        refresh_token: user.auth.googleRefreshToken,
        grant_type: "refresh_token",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
}

module.exports = { spotifyAuth, googleAuth, refreshSpotify, refreshYoutube };
