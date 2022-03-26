import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CoreEntity} from "../commons/CoreEntity";

@Entity()
export class Role extends CoreEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name: string

    @Column({type: "varchar", nullable: true})
    code: string

    @Column({type: "text"})
    description: string

    @Column({type: "json", nullable: true})
    permissions: string

    // @ManyToOne(() => User, user => user.roles)
    // user: User;
}