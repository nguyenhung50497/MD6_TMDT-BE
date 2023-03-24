import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    idNotification: number
    @Column()
    idUser: number
    @Column()
    idShop: number;
    @Column()
    idCart: number;
    @Column()
    contentNotification: string
    @Column()
    statusNotification: string
}