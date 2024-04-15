import express from "express";
import createUser from "../operations/user/createUser.js";
import getUsers from "../operations/user/getUsers.js";
import loginUser from "../operations/user/loginUser.js";
import updateUser from "../operations/user/updateUser.js";
import checkUsername from "../operations/user/checkUsername.js";

const router = express.Router();

//Route to create a user
router.post("/", createUser);

// router.get("/", getUsers);

router.post("/login", loginUser);

router.post("/regis", checkUsername);

router.put("/:id", updateUser);

export default router;
