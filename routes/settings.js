import express from "express";
import { getSettings, putSettings } from "../controllers/settignControllers.js";
export const routerSettings = express.Router();

routerSettings.get("/get-settings", getSettings);
routerSettings.put("/edit-settings", putSettings);
