const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");

router.get("/projects/all", async (req, res) => {
  try {
    const projects = await Project.find({});

    if (!projects) {
      return res.status(400).json({ error: "Unable to fetch projects." });
    }

    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/projects", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "projects"
      })
      .execPopulate();
    res.status(200).json(req.user.projects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/projects", auth, async (req, res) => {
  const project = new Project({
    ...req.body,
    owner: req.user._id
  });

  project
    .save()
    .then(() => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
