import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new UserController();

router.get("/me", authMiddleware, controller.me);

export const userRoutes = router;