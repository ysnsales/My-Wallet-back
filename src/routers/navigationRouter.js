import { Router } from "express";
import { home, transactions } from "../controllers/navigation.controller.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import transactionSchema from "../schemas/transactionSchema.js"

const navigationRouter = Router();
navigationRouter.get("/home", home);
navigationRouter.post("/transactions/:type", schemaValidationMiddleware(transactionSchema), transactions);

export default navigationRouter;