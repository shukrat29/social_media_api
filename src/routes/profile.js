const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid edit request");
      //   return res.status(400).send("")
    }

    const loggedInuser = req.user; // attached by userAuth
    // console.log(loggedInuser);
    // edit loggedIn user
    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
    await loggedInuser.save();
    // console.log(loggedInuser);
    res.send(`${loggedInuser.firstName}, your profile updated successful`);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = profileRouter;
