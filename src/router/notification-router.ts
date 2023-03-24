import { Router } from "express";
import notificationController from "../controller/NotificationController";
import { auth } from "../middleware/auth";

export const notificationRouter = Router();
notificationRouter.get("", notificationController.getAllNotification);
notificationRouter.post("", notificationController.createNotification);
notificationRouter.put("/:id", notificationController.editNotification);
notificationRouter.delete("/:id", notificationController.removeNotification);
notificationRouter.get("/find-by-user/:id", notificationController.findByIdUser);
notificationRouter.get("/find-by-shop/:id", notificationController.findByIdShop);

notificationRouter.use(auth);
