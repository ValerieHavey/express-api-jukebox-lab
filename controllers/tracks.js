const Track = require("../models/track.js");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//READ, GET, /tracks
router.get("/", async (req, res) => {
  try {
    const foundTrack = await Track.find();
    res.status(200).json(foundTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//READ, GET, /track/:trackId
router.get("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (!foundTrack) {
      res.status(404);
      throw new Error("Track not found.");
    }
    res.status(200).json(foundTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

//UPDATE, PUT, /track/:trackId
router.put("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body
    );
    res.status(200).json(foundTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE, DELETE,
router.delete("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findByIdAndDelete(req.params.trackId);
    if (!foundTrack) {
      res.status(500);
      throw new Error("Internal Service Error");
    }
    res.status(200).json(foundTrack);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
