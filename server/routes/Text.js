const express = require("express");
const router = express.Router();
const pool = require("..db/db");

// GET TEXT
router.get("/", async (req, res) => {
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
router.put("/", async (req, res) => {
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

module.exports = router;
