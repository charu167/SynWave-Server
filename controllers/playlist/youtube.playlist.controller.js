const { default: axios } = require("axios");

//Main Controllers
async function getYoutubePlaylist(req, res) {
  await axios
    .get("https://www.googleapis.com/youtube/v3/playlistItems", {
      params: {
        part: "snippet",
        playlistId: req.headers.id,
        key: "AIzaSyAJn2GD8tKEysknA4gIsLIMf7df1zUg8J4",
        pageToken: req.headers.nextpagetoken,
      },
    })
    .then((response) => {
      const tracks = response.data.items.map((e) => {
        return e.snippet.title;
      });

      res.status(200).json({
        items: tracks,
        nextPageToken: response.data.nextPageToken,
      });
    })
    .catch((error) => {
      res.json(error);
    });
}

async function createYoutubePlaylist(req, res) {
  await axios
    .post(
      "https://www.googleapis.com/youtube/v3/playlists",
      JSON.stringify({
        snippet: {
          title: req.body.title,
        },
        status: {
          privacyStatus: "public",
        },
      }),
      {
        params: {
          part: "snippet,status",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.body.access_token,
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

async function searchTrack(req, res) {
  await axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: req.query.q,
        type: "video",
        key: "AIzaSyAJn2GD8tKEysknA4gIsLIMf7df1zUg8J4",
      },
    })
    .then((response) => {
      res.status(200).json(response.data.items[0].id.videoId);
    })
    .catch((error) => {
      res.status(error);
    });
}

async function addTrackstoYoutube(req, res) {
  await axios
    .post(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      JSON.stringify({
        snippet: {
          playlistId: req.body.playlistid,
          resourceId: {
            kind: "youtube#video",
            videoId: req.body.videoid,
          },
        },
      }),
      {
        params: {
          part: "snippet",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.body.access_token,
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

module.exports = {
  getYoutubePlaylist,
  createYoutubePlaylist,
  addTrackstoYoutube,
  searchTrack,
};
