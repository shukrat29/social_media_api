const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }

    // Validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;

    // find the user from database
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};

module.exports = { userAuth };
