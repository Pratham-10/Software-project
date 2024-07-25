const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config({path : '../.env'});
const jwtPassKey = process.env.JWT_PASSWORD
function userMiddleware(req, res, next) {
    try{
    const validator = req.headers.authorization.split(" ")
    const token = validator[1];
    try{
        if(jwt.verify(token,jwtPassKey)){
        next()
    }
    } catch(e){
        console.log(e);
        res.status(403).json({
            "message":"You are not authorized as a user.Please signup or sign in to your account"
        })
    }
  } catch(e){
    console.log(e);
    res.status(404).json({
        "message":"Token not found"
    })
  }
}

module.exports = userMiddleware;