// import node modules
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config({path : '../.env'});
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 

//create experss instance
const app = express();


//import routes.
const userRoutes = require("./routes/userRoutes");
const detailRoutes = require("./routes/detailRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const tripRoutes = require('./routes/tripRoutes'); 
//configure env variables
const PORT = 3300;
const MONGO_URI = process.env.uri;
//using global middleware
app.use(cors());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

//setting up routes
app.use(userRoutes);
app.use(detailRoutes);
app.use(adminRoutes);
//start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server started on port: ", PORT);
    });
  })

  .catch((err) => {
    console.log(err);
    console.log(
      "An error occured while connecting to database or starting server"
    );
  });


