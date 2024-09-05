const express = require("express");
const router = express.Router();

const createUser = require("../controllers/user/createUserController");
const updateUser = require("../controllers/user/updateUserController");
const deleteUser = require("../controllers/user/deleteUserController");
const loginUser = require("../controllers/user/loginUserController");
const {
  getUsersController,
  getUserByEmailController,
} = require("../controllers/user/getUserController");

module.exports = function (admin) {
  // Create a new user
  router.post("/create", (req, res) => createUser(req, res, admin));

  //login a User
  router.post("/login", (req, res) => loginUser(req, res, admin));

  // Get all users
  router.get("/", getUsersController);

  // Get a user by email
  router.get("/:email", getUserByEmailController);

  // Update an existing user by email
  router.put("/:email", (req, res) => updateUser(req, res, admin));

  // Delete a user by email
  router.delete("/:email", (req, res) => deleteUser(req, res, admin));

  return router;
};
