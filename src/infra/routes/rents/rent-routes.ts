import { Router } from "express";
import { RentController } from "../../../presenters/controllers/rents/rent-controller";

const rentController = new RentController();

const router = Router();

router.post("/", rentController.create)
router.put("/:id/finish", rentController.finish)

export { router as rentRouter}