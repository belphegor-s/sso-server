import { Router } from "express";
import { deleteController } from "../controllers/user";
import passport from "passport";
const router = Router();

router.delete("/user/:id", passport.authenticate("jwt", { session: false }), deleteController);

export default router;
