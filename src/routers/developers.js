const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/developers", async (req, res) => {
  try {
      const developers = await User.find({ isDeveloper: true });

    if (!developers) {
      return res.status(400).json({ error: "Unable to fetch developers." });
    }
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/developers/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const developer = await User.findById(_id);
        const isDev = await User.find({ isDeveloper: true });
        if (!user && !isDev) {
            return res.status(404).send()
        }
        res.send(developer);
    } catch (error) {
        res.status(500).send(error);
    }
});

