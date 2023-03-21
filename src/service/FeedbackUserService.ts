import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {FeedbackUser} from "../model/feedbackUser";

class FeedbackUserService {
    private feedbackUserRepository

    constructor() {
        this.feedbackUserRepository = AppDataSource.getRepository(FeedbackUser);
    }

    save = async (feedback) => {
        let time = new Date().toLocaleDateString();
        feedback.timeFeedback = time;
        return this.feedbackUserRepository.save(feedback);
    };
    update = async (idFeedback, newFeedback) => {
        let feedback = await this.feedbackUserRepository.findOneBy({
            idFeedback: idFeedback,
        });
        if (!feedback) {
            return null;
        }
        return this.feedbackUserRepository.update(
            {idFeedback: idFeedback},
            newFeedback
        );
    };
    remove = async (idFeedback) => {
        let feedback = await this.feedbackUserRepository.findOneBy({
            idFeedback: idFeedback,
        });
        if (!feedback) {
            return null;
        }
        return this.feedbackUserRepository.delete({idFeedback: idFeedback});
    };
    findById = async (idProduct) => {
        let sql = `select *
                   from feedback_user f
                            join product p on f.idProduct = p.idProduct
                            join user u on f.idUser = u.idUser
                            join category c on p.idCategory = c.idCategory
                   where p.idProduct = ${idProduct}`;
        let feedback = await this.feedbackUserRepository.query(sql);
        if (!feedback) {
            return null;
        }
        return feedback[0];
    };
}

export default new FeedbackUserService();