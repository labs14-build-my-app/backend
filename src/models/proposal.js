const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  body: {
    type: String,
    maxlength: 1500
  },
  price: {
    type: Number
  }
});

module.exports = proposalSchema;
// This is imported and used in the project.js model.
