import {
  createPerson,
  deletePerson,
  getAllPersons,
  getPerson,
  updatePerson,
} from "../controller/person.controller.js";
import { validatePersonFields } from "../controller/middleware.js";
import Router from "express";

const router = Router();

router.get("/person", getAllPersons);
router.get("/person/:id", getPerson);
router.post("/person", validatePersonFields, createPerson);
router.put("/person/:id", updatePerson);
router.delete("/person/:id", deletePerson);

export default router;
