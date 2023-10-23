import { Router } from "express";
import { login, protectedController, register } from "../controllers/auth";
import passport from "passport";
const router = Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local", { session: false }), login);
router.get("/protected", passport.authenticate("jwt", { session: false }), protectedController);

export default router;
