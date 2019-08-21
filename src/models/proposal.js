const mongoose = require("mongoose");
const User = require("../models/user");

const proposalSchema = new mongoose.Schema({
  body: {
    type: String,
    maxlength: 1500
  },
  price: {
    type: Number
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  developerName: {
    type: String
  }
});

proposalSchema.pre("save", async function(next) {
  proposal = this;
  const dev = await User.findById(proposal.developer);
  proposal.developerName = `${dev.firstName} ${dev.lastName}`;
  next();
});

module.exports = proposalSchema;
// This is imported and used in the project.js model.
