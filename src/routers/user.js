const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/users/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id, isDeveloper: false });

    if (!user) {
      return res
        .status(400)
        .json({
          error: `There was no user with an ID ${id} who is an entrepreneur.`
        });
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (e) {
    res
      .status(400)
      .json({ error: `There was an error creating the user. ${e}` });
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    if (!user) {
      res.status(401).json({ error: "Wrong credentials." });
    }

    res.status(200).json({ user, token });
  } catch (e) {
    res.status(400).json({ error: "Wrong credentials." });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({ success: "Logged out successfully" });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res
      .status(200)
      .json({ success: "Successfully signed out of all devices." });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    res.status(500).json({ error: "There was an error retrieving the user." });
  }
});

router.put("/users/me", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age", "isDeveloper"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: `Invalid updates.` });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).json(req.user);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res
      .status(200)
      .json({ success: `User ${req.user.name} was successfully deleted.` });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
