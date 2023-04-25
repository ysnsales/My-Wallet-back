import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", schemaValidationMiddleware(userSchema), signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;