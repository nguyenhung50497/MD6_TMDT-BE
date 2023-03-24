import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    idNotification: number
    @Column()
    idSender: number
    @Column()
    idReceiver: number;
    @Column()
    contentNotification: string
    @Column()
    statusNotification: string
}