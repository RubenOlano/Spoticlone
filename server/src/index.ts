import "dotenv/config";
import cors from "cors";
import express from "express";
import { stringify } from "querystring";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.route("/").get((_req, res) => {
  res.send("Hello World!");
});

app.route("/login").get(async (_req, res) => {
  res.redirect(
    "http://accounts.spotify.com/authorize?client_id=" +
      process.env.SPOTIFY_CLIENT_ID +
      "&response_type=code&redirect_uri=" +
      process.env.REDIRECT_URI +
      "&scope=user-read-private%20user-read-email&show_dialog=true"
  );
});

app.route("/callback").get(async (req, res) => {
  try {
    const code = req.query?.code as string;
    const { data } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error }).status(error.status);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
