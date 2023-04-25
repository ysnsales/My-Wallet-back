import { Router } from "express";
import dayjs from "dayjs";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {operationSchema} from "../schemas/operation.schema.js"
import { home, transactions } from "../controllers/navigation.controller.js";

const navigationRouter = Router();

navigationRouter.get("/home", home);

navigationRouter.post("/transactions/:type", validateSchema(operationSchema), transactions);

export default navigationRouter;