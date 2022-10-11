const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const tracksRoute = require("./routes/Tracks");
const genresRoute = require("./routes/Genres");
const textRoute = require("./routes/Text");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// CRUD Functionality
app.use("/api/tracks", tracksRoute);
app.use("/api/genres", genresRoute);
app.use("/api/text", textRoute);

// Request pages from client
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
