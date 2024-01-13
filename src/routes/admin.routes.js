import Router from "express";
import { createAdmin, getAdmin } from "../controller/admin.controller.js";

const router = Router();

router.get("/admin/:id", getAdmin);
router.post("/admin", createAdmin);

export default router;
