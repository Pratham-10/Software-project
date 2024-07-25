const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config({path : '../.env'});
const jwt = require("jsonwebtoken")
const jwtPassword = process.env.JWT_PASSWORD

exports.userDetail = async (req, ress) => {
  const validator = req.headers.authorization.split(" ")
  const token = validator[1];
  const decodedUser = jwt.decode(token);

  //lean is for returning plain javascript object from db
  const userData = await User.findOne({ username: decodedUser.user}).lean();
try{
  if (!userData) {
    console.log(error);
    return ress.status(404).json({ error: 'User not found' });
  }
  ress.send(userData);
}
  catch (err) {
    console.log(err);
    ress.send(err);
  }
};



exports.register = async (req, res) => {

  const accountData = {
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    dob : req.body.dob,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
  } 
  const hashRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, hashRounds, (err, hash) => {
      if (err) {``
        console.error('Error hashing password:', err);
        reject(err);
      } else {
        console.log("Hashed Password:", hash);
        resolve(hash);
      }
    });
  });

  await User.create({...accountData,password: hashedPassword})
    .then((ress) => {
      res.send(ress);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.login = async(req,res)=>{
  const user = req.body.username;
  const password = req.body.password;
  const userData = await User.findOne({ username: user });
try{
  if (!userData) {
    console.log(error);
    return ress.status(404).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password from the database
  const passwordMatch = await bcrypt.compare(password, userData.password);
console.log(passwordMatch);
  if (!passwordMatch) {
    ress.status(401).json({ error: 'Invalid password' });
  } else {
    const token = jwt.sign({
      user
    },jwtPassword)
    res.json({
      message:"User login successfully",
      token:token
    })
  }
}
  catch (err) {
    console.log(err);
    ress.send(err);
  }
};

exports.token = async (req, res) => {
  const validator = req.headers.authorization.split(" ")
  const token = validator[1];
  const decodedUser = jwt.decode(token);
  await User.updateOne({ username: decodedUser.user}, { $inc: { wallet: req.body.amount } })
    .then((response) => {
      console.log(response);
      res.status(200).json({
        message:"Token added successfully in your wallet"
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
