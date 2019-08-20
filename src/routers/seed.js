const router = require("express").Router();
const Project = require("../models/project");
const User = require("../models/user");

router.get("/seed", async (req, res) => {
  const users = [
    {
      firstName: "Alfonso",
      lastName: "Garcia",
      password: "alfonso123",
      email: "alfonso@alfonso.com",
      isDeveloper: false
    },
    {
      firstName: "Ruben",
      lastName: "Ponce",
      password: "ruben123",
      email: "ruben@ruben.com",
      isDeveloper: true
    },
    {
      firstName: "Jacob",
      lastName: "Tonna",
      password: "jacob123",
      email: "jacob@jacob.com",
      isDeveloper: false
    },
    {
      firstName: "Anatoly",
      lastName: "Leytman",
      password: "anatoly123",
      email: "anatoly@anatoly.com",
      isDeveloper: true
    },
    {
      firstName: "Benjamin",
      lastName: "Lopez",
      password: "benjamin123",
      email: "benjamin@benjamin.com",
      isDeveloper: false
    }
  ];

  for (user of users) {
    let newUser = new User(user);
    console.log(user.firstName);
    newUser.save();
  }

  res.send("Users seeded in db");
});

module.exports = router;
