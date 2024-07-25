const express = require("express");
const userMiddleware = require("../middlewares/user");
const router = express.Router();
const userController = require("../controller/userController");
router.post("/newuser", userController.register);
router.post("/login",userController.login)
router.get("/userdetail",userMiddleware,userController.userDetail);
router.put("/token",userMiddleware,userController.token);
module.exports = router;
