import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddressUser {
    @PrimaryGeneratedColumn()
    idAddress: number;
    @Column()
    province: string;
    @Column()
    idUser: string;
    @Column()
    fullName: string;
    @Column()
    phoneAddress: string;
    @Column()
    district: string;
    @Column()
    descriptionAddress: string;
    @Column()
    typeAddress: string;

}



