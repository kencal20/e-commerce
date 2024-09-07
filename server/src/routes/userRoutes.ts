import { Request, Response } from "express";

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

export async function userRoutes (admin: any) {
  // Create a new user
  router.post("/create", (req: Request, res: Response) => createUser(req, res, admin));

  //login a User
  router.post("/login", (req: Request, res: Response) => loginUser(req, res, admin));

  // Get all users
  router.get("/", (req: Request, res: Response) => getUsersController(req, res));

  // Get a user by email
  router.get("/:email", (req: Request, res: Response) => getUserByEmailController(req, res));

  // Update an existing user by email
  router.put("/:email", (req: Request, res: Response) => updateUser(req, res, admin));

  // Delete a user by email
  router.delete("/:email", (req: Request, res: Response) => deleteUser(req, res, admin));

  return router;
};
module