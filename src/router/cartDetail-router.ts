import { Router } from "express";
import { auth } from "../middleware/auth";
import { userAuth } from "../middleware/userAuth";
import cartDetailController from "../controller/CartDetailController";
export const cartDetailRouter = Router();
// cartDetailRouter.use(auth);
cartDetailRouter.get("/", cartDetailController.getAllCartDetail);
cartDetailRouter.get("/find-by-id/:id", cartDetailController.getAllCartDetail);
cartDetailRouter.post("/", cartDetailController.createCartDetail);