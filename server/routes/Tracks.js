const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET ALL TRACKS
router.get("/", async (_, res) => {
  try {
    const allTracks = await pool.query("SELECT * FROM tracks");
    res.status(200).json(allTracks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting single track: ", err);
  }
});

// GET SINGLE TRACK
router.get("/single", async (req, res) => {
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
router.put("/", async (req, res) => {
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
      album,
    } = req.body;
    await pool.query(
      "UPDATE tracks SET track_name=$1, track_artist=$2, track_album=$3, track_work=$4, track_about=$5, track_year=$6, track_genre=$7, track_featured=$8, track_spotify=$9, track_apple=$10, track_tidal=$11 WHERE track_id=$12",
      [
        name,
        artist,
        album,
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

// ADD TRACK
router.post("/", async (req, res) => {
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

// DELETE TRACK
router.delete("/", async (req, res) => {
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

module.exports = router;
