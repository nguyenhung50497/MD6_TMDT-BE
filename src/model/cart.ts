import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
   @PrimaryGeneratedColumn()
   idCart: number;
   @Column()
   idUser: number;
   @Column({ default: "Chua Thanh Toan" })
   statusCart: string;
   @Column({ default: "" })
   timePayCart: string;
}
