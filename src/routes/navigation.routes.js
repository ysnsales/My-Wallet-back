import { Router } from "express";
import { home, transactions } from "./controllers/navigation.controller.js";

const navigationRouter = Router();

navigationRouter.get("/home", home);

navigationRouter.post("/transactions/:type", transactions);

export default navigationRouter;