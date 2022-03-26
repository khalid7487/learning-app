import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/User.entity";
import {CoreEntity} from "../commons/CoreEntity";
import { CourseEnrol } from "../enrol/CourseEnrol.entity";
 
@Entity()
export class UserPosts extends CoreEntity {


    constructor(userPosts: Partial<UserPosts>) {
        super()
        Object.assign(this, userPosts)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({default: 1})
    status: number          // 0 -> pending 1-> Active

    @Column({default: 0})
    tutor_type: number          // 0 -> Physical 1-> Virtual

    @Column({default: 0})
    price_per_month: number

    @Column({default: 0})
    number_of_days_in_week: number

    @Column({type: "text"})
    location: string

    @Column({type: "text", nullable: true})
    teaching_subject: string

    @Column({type: "text"})
    preffered_version: string

    @Column({type: "text"})
    preffered_class: string

    @Column({type: "text"})
    preffered_subject: string

    @Column({type: "text"})
    preffered_time: string
    
    @Column({type: "text"})
    description: string

    @ManyToOne(() => User, user => user.userPosts, {
        onDelete: 'CASCADE'
    })
    user: User;

}