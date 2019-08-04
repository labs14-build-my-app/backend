const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/project");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Emai is invalid.`);
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number.");
        }
      }
    },
    isDeveloper: {
      type: Boolean,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Relationships between other models of data
userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "owner"
});

// Static methods -----
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return user;
};

// methods to each individual user --------
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// toJSON method - responsible for what gets sent back to the client -------
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.__v;
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Pre and Post methods
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
