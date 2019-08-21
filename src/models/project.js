const mongoose = require("mongoose");
const proposalSchema = require("./proposal");

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

// methods to each individual project ------------

// toJSON method -----------
projectSchema.methods.toJSON = function() {
  const project = this;
  const projectObject = project.toObject();

  delete projectObject.__v;

  return projectObject;
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
