import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signUpSchema, signInSchema } from "../schemas/user.schema.js";
import { signIn, signUp } from "../controllers/user.controller.js";
import dayjs from "dayjs";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema),  signUp);

userRouter.post("/sign-in", validateSchema(signInSchema),  signIn);

export default userRouter;