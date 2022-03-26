import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CoreEntity} from "../commons/CoreEntity";
import { Course } from "../course/Course.entity";
import { Schedule } from "../course/Schedule.entity";


@Entity()
export class TeacherPostEnrol extends CoreEntity {

    constructor(teacherPostEnrol: Partial<TeacherPostEnrol>) {
        super()
        Object.assign(this, teacherPostEnrol)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({type: 'bigint'})
    teacher_id: bigint

    @Column({type: 'bigint'})
    user_id: bigint

    @Column({type: 'bigint'})
    teacher_post_id: bigint

    @Column({default: 0})
    price_per_month: number

    @Column({type: "text"})
    area_covered: string

    @Column({type: "text"})
    preffered_version: string

    @Column({type: "text"})
    preffered_class: string

    @Column({type: "text"})
    preffered_subject: string

    @Column({type: "text"})
    preffered_time: string

    @Column({ type: "text", nullable: true })
    comments: string
    
 }