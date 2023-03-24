import {Request, Response} from "express";
import notificationService from "../service/NotificationService";

class NotificationController {
    private notificationService

    constructor() {
        this.notificationService = notificationService
    }

    getAllNotification = async (req: Request, res: Response) => {
        try {
            let notifications = await notificationService.getAllNotification();
            return res.status(201).json(notifications);
        } catch (err) {
            res.status(500).json(err.message);
        }
    };
    createNotification = async (req: Request, res: Response) => {
        try {
            let notification = await notificationService.save(req.body);
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    editNotification = async (req: Request, res: Response) => {
        try {
            let idNotification = req.params.id;
            let notification = await this.notificationService.update(
                idNotification,
                req.body
            );
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    removeNotification = async (req: Request, res: Response) => {
        try {
            let idNotification = req.params.id;
            let notification = await this.notificationService.remove(idNotification);
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findByIdUser = async (req: Request, res: Response) => {
        try {
            let idUser = req.params.id;
            let notifications = await notificationService.findByUser(idUser);
            return res.status(200).json(notifications);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findByIdShop = async (req: Request, res: Response) => {
        try {
            let idShop = req.params.id;
            let notifications = await notificationService.findByShop(idShop);
            return res.status(200).json(notifications);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
}

export default new NotificationController();