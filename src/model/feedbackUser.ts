import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeedbackUser {
    @PrimaryGeneratedColumn()
    idFeedback: number
    @Column()
    idProduct: number
    @Column({type: "varchar"})
    contentFeedback: string;
    @Column()
    idUser: number
    @Column()
    reviews: number
    @Column()
    timeFeedback: string
}