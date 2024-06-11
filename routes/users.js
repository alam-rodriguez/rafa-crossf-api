import express from "express";
export const routerUser = express.Router();

import { changeUserPaymentUpTo, createUser, getUser, getUsers, getUsersActives, setStatusUser, updateUserInfo } from "../controllers/userControllers.js";

routerUser.post("/create-user", createUser);
routerUser.get("/get-users", getUsers);
routerUser.get("/get-users-actives", getUsersActives);
routerUser.get("/get-users/:id", getUser);
routerUser.patch("/set-user-status/:id", setStatusUser);
routerUser.patch("/change-user-payment-up-to/:id", changeUserPaymentUpTo);

routerUser.put("/update-user/:id", updateUserInfo);
