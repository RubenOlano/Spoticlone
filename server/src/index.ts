import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.route("/").get((_req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 3000`);
});
