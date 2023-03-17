import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartDetail {
   @PrimaryGeneratedColumn()
   idCartDetail: number;
   @Column()
   idCart: number;
   @Column()
   idProduct: number;
   @Column()
   quantity: number;
   @Column()
   priceInCart: number;
   @Column()
   timeCartDetail: string;
}
