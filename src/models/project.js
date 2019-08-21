const mongoose = require("mongoose");
const proposalSchema = require("./proposal");
const User = require("../models/user");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    ownerName: {
      type: String
    },
    proposals: [proposalSchema],
    status: {
      type: String,
      default: "searching",
      trim: true,
      enum: [
        "in progress",
        "review",
        "updated",
        "completed",
        "cancelled",
        "searching"
      ]
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: [String],
      enum: [
        "finance",
        "marketing",
        "management",
        "SEO",
        "ios",
        "android",
        "other"
      ],
      required: true
    },
    tags: {
      type: [String],
      required: true,
      trim: true
    },

    developers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    endDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

projectSchema.pre("save", async function(next) {
  const project = this;
  const owner = await User.findById(project.owner);

  if (!project.ownerName) {
    project.ownerName = `${owner.firstName} ${owner.lastName}`;
  }

  next();
});
// toJSON method -----------
projectSchema.methods.toJSON = function() {
  const project = this;
  const projectObject = project.toObject();

  delete projectObject.__v;

  return projectObject;
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
