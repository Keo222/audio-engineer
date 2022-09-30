const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Bring in API
// const apiRoutes = require("./api");
// app.use("/api", apiRoutes);

// GET ALL TRACKS --TESTED
app.get("/api/tracks", async (_, res) => {
  try {
    const allTracks = await pool.query("SELECT * FROM tracks");
    res.status(200).json(allTracks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting single track: ", err);
  }
});

// GET SINGLE TRACK
app.get("/api/tracks/single", async (req, res) => {
  try {
    const { id } = req.query;
    const singleTrack = await pool.query(
      "SELECT * FROM tracks WHERE track_id = $1",
      [id]
    );
    res.status(200).json(singleTrack.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting single track: ", err);
  }
});

// UPDATE TRACK
app.put("/api/tracks/", async (req, res) => {
  try {
    const {
      id,
      name,
      artist,
      work,
      about,
      year,
      genre,
      featured,
      spotify,
      apple,
      tidal,
    } = req.body;
    await pool.query(
      "UPDATE tracks SET track_name=$1, track_artist=$2, track_work=$3, track_about=$4, track_year=$5, track_genre=$6, track_featured=$7, track_spotify=$8, track_apple=$9, track_tidal=$10 WHERE track_id=$11",
      [
        name,
        artist,
        work,
        about,
        year,
        genre,
        featured,
        spotify,
        apple,
        tidal,
        id,
      ]
    );
    res.status(200).send("200 Track Updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error updating: ", err);
  }
});

// UPDATED ADD TRACK
app.post("/api/tracks", async (req, res) => {
  try {
    const {
      name,
      artist,
      work,
      about,
      year,
      genre,
      featured,
      spotify,
      apple,
      tidal,
      album,
    } = req.body;
    await pool.query(
      "INSERT INTO tracks (track_name, track_artist, track_work, track_about, track_year, track_genre, track_featured, track_spotify, track_apple, track_tidal, track_album) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        name,
        artist,
        work,
        about,
        year,
        genre,
        featured,
        spotify,
        apple,
        tidal,
        album,
      ]
    );
    res.status(200).send("200 New Track Added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`500 Error adding new track: ${err}`);
  }
});

// DELETE TRACK -- UNTESTED
app.delete("/api/tracks/", async (req, res) => {
  try {
    console.log(req);
    const { id } = req.body;
    console.log(id);
    await pool.query("DELETE FROM tracks WHERE track_id = $1", [id]);
    res.status(200).send("200 Track Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error adding new track", err);
  }
});

// GENRES API ****************************************

// GET GENRES
app.get("/api/genres", async (req, res) => {
  try {
    const allGenres = await pool.query("SELECT * FROM genres");
    res.status(200).json(allGenres.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting genres: ", err);
  }
});

// ADD NEW GENRE
app.post("/api/genres", async (req, res) => {
  try {
    const { newGenre } = req.body;
    await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [newGenre]);
    res.status(200).send("200 Genre Added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error adding new genre: ", err);
  }
});

// DELETE GENRES
app.delete("/api/genres", async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query("DELETE FROM genres WHERE genre_name = $1", [name]);
    res.status(200).send("200 Genre Deleted");
  } catch (err) {
    res.status(500).send("500 Error getting genres: ", err);
  }
});

// TEXT API **************************************

// GET TEXT
app.get("/api/text", async (req, res) => {
  try {
    const { name } = req.query;

    // Get all text
    if (name === "all") {
      const text = await pool.query("SELECT * FROM text");
      res.json(text.rows);
    } else {
      // Get single text
      const text = await pool.query("SELECT * FROM text WHERE name = $1", [
        name,
      ]);
      res.status(200).json(text.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting text: ", err);
  }
});

// UPDATE TEXT
app.put("/api/text/", async (req, res) => {
  try {
    const { name, text } = req.body;
    await pool.query("UPDATE text SET stored_text=$2 WHERE name=$1", [
      name,
      text,
    ]);
    res.status(200).send("200 Text Updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error updating text: ", err);
  }
});

// GENERIC *****************************************
// TEST
app.post("/test", (req, res) => {
  try {
    console.log("test");
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
  res.end();
});

// Request pages from client
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
