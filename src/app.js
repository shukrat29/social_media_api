const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user");

const app = express();

// middleware to convert json object send by client to javascript object
app.use(express.json());

// POST api  //Define the signup route
app.post("/signup", async (req, res) => {
  // Getting user data from the request body(from frontend)
  // and creating a new user in the database using the userModel
  const user = new userModel(req.body);
  // Save the user to the database
  try {
    await user.save();
    res.send("User successfully added to database");
  } catch (error) {
    res.status(400).send("User can not save to database:" + error.message);
  }
});

// GET api / get user by email = all users having same emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await userModel.find({ emailId: userEmail });
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// GET api / get only one user by email = all users having same emailId
app.get("/oneuser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await userModel.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// GET api / GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// update user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    await userModel.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update failed");
  }
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
