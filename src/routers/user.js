const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

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
