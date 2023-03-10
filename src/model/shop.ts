import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  idShop: number;
  @Column({ default: "" })
  nameShop: string;
  @Column({ default: "" })
  emailShop: string;
  @Column({ default: "" })
  addressShop: string;
  @Column({ default: "" })
  phoneShop: number;
  @Column({ type: "text" })
  imageShop: string;
  @Column()
  idUser: number;
}