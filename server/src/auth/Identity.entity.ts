import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CoreEntity} from "../commons/CoreEntity";

@Entity()
export class Identity extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    // nid
    @Column({nullable: true, type: "varchar"})
    nid_no: string

    @Column({nullable: true, type: "text"})
    nid_front: string

    @Column({nullable: true, type: "text"})
    nid_back: string


    // passport
    @Column({nullable: true, type: "varchar"})
    passport_no: string

    @Column({nullable: true, type: "text"})
    passport_front: string

    @Column({nullable: true, type: "text"})
    passport_back: string
}