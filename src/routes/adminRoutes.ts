import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/rbacMiddleware";

const router = Router();
const controller = new AdminController();

router.get("/ping", authMiddleware, requireRole("ADMIN"), controller.ping);

export const adminRoutes = router;