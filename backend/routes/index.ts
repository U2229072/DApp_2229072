import express from "express";
import { register } from "../controllers/index.js";
// We will create a router object
const router = express.Router();
router.post("/", register);
// We will export the router
export default router;
