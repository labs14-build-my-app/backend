const router = require("express").Router();
const User = require("../models/user");

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

module.exports = router;
