const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");

router.get("/projects/all", auth, async (req, res) => {
  try {
    const qparams = {};
    const newProjects = [];

    if (req.query.category) {
      qparams.category = req.query.category;
    }

    const projects = await Project.find({ ...qparams })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip));

    if (!projects) {
      return res.status(400).json({ error: "Unable to fetch projects." });
    }

    projects.forEach(project => {
      if (!project.developers.includes(req.user._id)) {
        newProjects.push(project);
      }
    });

    res.status(200).json(newProjects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/projects", auth, async (req, res) => {
  if (req.user.isDeveloper) {
    return res.status(400).json({
      error:
        "User is a developer. Please use the endpoint /projects/dev to fetch developer's owned projects"
    });
  }
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

router.get("/projects/dev", auth, async (req, res) => {
  if (!req.user.isDeveloper) {
    return res.status(400).json({ error: "User is not a developer." });
  }
  try {
    await req.user
      .populate({
        path: "devprojects"
      })
      .execPopulate();
    res.status(200).json(req.user.devprojects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/projects/dev/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.developers.includes(req.user._id)) {
      return res.status(400).json({ error: "You already have that project." });
    }
    project.developers.push({ _id: req.user._id });
    if (project.status == "searching") {
      project.status = "review";
    }

    await project.save();

    res.status(200).json(project);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/projects/:id", auth, async (req, res) => {
  const { id: _id } = req.params;

  try {
    const project = await Project.findOne({ _id, owner: req.user._id });

    if (!project) {
      return res
        .status(400)
        .json({ error: `Project with the id ${id} does not exist.` });
    }

    res.status(200).json({ project });
  } catch (e) {
    res.status(500).json({ error: `Invalid ID.` });
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

router.put("/projects/:id", auth, async (req, res) => {
  const allowedUpdates = [
    "name",
    "description",
    "developers",
    "status",
    "category",
    "tags",
    "price",
    "endDate",
    "proposals",
    "ownerName"
  ];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(401).json({ error: `Invalid updates!` });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res
        .status(400)
        .json({ error: `There is no project with an id of ${id}` });
    }

    updates.forEach(update => (project[update] = req.body[update]));

    await project.save();

    res.status(200).json(project);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/projects/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOneAndDelete({
      _id: id,
      owner: req.user._id
    });

    if (!project) {
      return res
        .status(400)
        .json({ error: `There is no project with an ID of ${id}` });
    }

    res.status(200).json(project);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/projects/:id/proposal", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    project.proposals.push({ ...req.body, developer: req.user._id });
    // console.log(project.proposals[project.proposals.length - 1]);

    await project.save();

    res.status(201).json(project);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
