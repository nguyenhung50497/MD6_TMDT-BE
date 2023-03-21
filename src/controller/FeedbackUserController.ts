import categoryService from "../service/CategoryService";
import {Request, Response} from "express";
import feedbackService from "../service/FeedbackUserService";

class FeedbackUserController {
    private feedbackService;
    constructor() {
        this.feedbackService = feedbackService;

    }

    findByIdProduct = async (req: Request, res: Response) => {
        try {
            let idProduct = req.params.id;
            let feedbacks = await feedbackService.findById(idProduct);
            return res.status(200).json(feedbacks);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            let feedbacks = await feedbackService.save(req.body);
            return res.status(200).json(feedbacks);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            let idFeedback = req.params.id;
            let feedbacks = await this.feedbackService.update(idFeedback, req.body);
            return res.status(200).json(feedbacks);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    remove = async (req: Request, res: Response) => {
        try {
            let idFeedback = req.params.id;
            let feedbacks = await this.feedbackService.remove(idFeedback);
            return res.status(200).json(feedbacks);
        }
    catch(e) {
        res.status(500).json(e.message);
    }
};


}

export default new FeedbackUserController();
