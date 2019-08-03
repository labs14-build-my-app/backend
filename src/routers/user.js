const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json({ user });
  } catch (e) {
    res
      .status(400)
      .json({ error: `There was an error creating the user. ${e}` });
  }
});

router.post("/users/login", auth, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    if (!user) {
      res.status(401).json({ error: "Wrong credentials." });
    }

    res.status(200).json({ user, token });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
