const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

projectSchema.methods.toJSON = function() {
  const project = this;
  const projectObject = project.toObject();

  delete projectObject.__v;
  delete projectObject._id;

  return projectObject;
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
