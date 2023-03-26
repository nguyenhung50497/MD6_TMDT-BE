import {Notification} from "../model/notification";
import { AppDataSource } from "../data-source";

class NotificationService {
    private notificationRepository;
    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification);
    }

    getAllNotification = async () => {
        return await this.notificationRepository.find();
    };

    save = async (notification) => {
        console.log(notification)
        return this.notificationRepository.save(notification);
    };

    update = async (idNotification, newNotification) => {
        let notification = await this.notificationRepository.findOneBy({
            idNotification: idNotification,
        });
        if (!notification) {
            return null;
        }
        return this.notificationRepository.update(
            { idNotification: idNotification },
            newNotification
        );
    };
    remove = async (idNotification) => {
        let notification = await this.notificationRepository.findOneBy({
            idNotification: idNotification,
        });
        if (!notification) {
            return null;
        }
        return this.notificationRepository.delete({idNotification: idNotification});
    };
    findBySender = async (idSender) =>{
        let sql = `select * from notification where idSender = '${idSender}'`
        let notification = await this.notificationRepository.query(sql);
        if (!notification) {
            return null;
        }
        return notification;
    }
    findByReceiver = async (idReceiver) =>{
        let sql = `select * from notification where idReceiver = '${idReceiver}'`
        let notification = await this.notificationRepository.query(sql);
        if (!notification) {
            return null;
        }
        return notification;
    }
}
export default new NotificationService();