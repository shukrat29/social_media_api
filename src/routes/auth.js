const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // Save the user to the database
    await user.save();
    res.send("User successfully added to database");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Incorrect email or password");
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfull");
});

module.exports = authRouter;
