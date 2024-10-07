const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

//
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

//
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
