import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
   @PrimaryGeneratedColumn()
   idCart: number;
   @Column({ default: "" })
   idUser: number;
   @Column({ default: "" })
   statusCart: string;
   @Column({ default: "" })
   timePayCart: string;
}
