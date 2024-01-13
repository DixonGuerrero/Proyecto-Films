import Router from "express";
import { createUser } from "../controller/user.controller.js";


const router = Router();


router.post("/user", createUser);

export default router;
