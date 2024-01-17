const { default: axios } = require("axios");

//Importing db models
const User = require("../models/user.model");

//Get spotify user details and save them to db
async function spotifyUserSave(access_token, refreshToken) {
  await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then(async (res) => {
      const existingUser = await User.findOne({ email: res.data.email });

      if (existingUser) {
        User.findOneAndUpdate(
          { email: res.data.email },
          {
            $set: { "auth.spotifyRefreshToken": refreshToken },
          }
        );
      } else {
        const newUser = new User({
          email: res.data.email,
          name: res.data.display_name,
          spotifyID: res.data.id,
          googleID: "a",
          auth: {
            spotifyRefreshToken: refreshToken,
            googleRefreshToken: "a",
          },
        });

        newUser.save();
      }
    })
    .catch((error) => {
      res.json(error);
    });
}

//Get google user details and update the user collection in db
async function googleUserSave(access_token, refresh_token) {
  await axios
    .get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then(async (res) => {
      const updatedUser = await User.findOneAndUpdate(
        { email: res.data.email },
        {
          $set: {
            googleID: res.data.id,
            "auth.googleRefreshToken": refresh_token,
          },
        },
        { new: true }
      );
    })
    .catch((error) => res.json(error));
}

module.exports = { spotifyUserSave, googleUserSave };
