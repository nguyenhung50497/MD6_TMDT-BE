import { Router } from "express";
import { auth } from "../middleware/auth";
import { userAuth } from "../middleware/userAuth";
import cartDetailController from "../controller/CartDetailController";
import {searchRouter} from "./search-router";
export const cartDetailRouter = Router();
// cartDetailRouter.use(auth);
cartDetailRouter.post("/", cartDetailController.createCartDetail);
cartDetailRouter.get("/stats/sales",cartDetailController.salesStatsCartDetail)