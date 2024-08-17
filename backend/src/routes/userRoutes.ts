import { Router } from "express";
import {
  register,
  login,
  getUserFromToken,
} from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-from-token", getUserFromToken);

export default router;
