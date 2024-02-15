const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const { validateId } = require("../middleware/validateid");

//Write
//fs.writeFile()

//Routes
//Get User
userRouter.get("/users", userController.getUserData);

//Post User
userRouter.post("/users", userController.createUser);

//Get User by ID
userRouter.get("/users/:id", validateId, userController.getUserById);

//Update User by ID
userRouter.patch("/users/:id", userController.updateUser);

userRouter.delete("/users/:id", userController.deleteUser);

module.exports = userRouter;
