const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/projects", async (req, res) => {
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

router.post("/projects", async (req, res) => {
  const project = new Project({
    ...req.body
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
