const { request } = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "plase add the user name"],
    },
    email: {
      type: String,
      required: [true, "please add the user email adress"],
      unique: [true, "Email addres alredy taken"],
    },

    password: {
      type: String,
      required: [true, "please add the password"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
