const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET GENRES
router.get("/", async (req, res) => {
  try {
    const allGenres = await pool.query("SELECT * FROM genres");
    res.status(200).json(allGenres.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("500 Error getting genres: ", err);
  }
});

// ADD NEW GENRE
router.post("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query("DELETE FROM genres WHERE genre_name = $1", [name]);
    res.status(200).send("200 Genre Deleted");
  } catch (err) {
    res.status(500).send("500 Error getting genres: ", err);
  }
});

module.exports = router;
