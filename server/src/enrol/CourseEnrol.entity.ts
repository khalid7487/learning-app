import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/User.entity";
import {CoreEntity} from "../commons/CoreEntity";
import { Course } from "../course/Course.entity";
import { Schedule } from "../course/Schedule.entity";


@Entity()
export class CourseEnrol extends CoreEntity {

    constructor(courseEnrol: Partial<CourseEnrol>) {
        super()
        Object.assign(this, courseEnrol)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    // @Column({type: "text"})
    // meeting_url: string

    @Column({type: 'bigint'})
    teacher_id: bigint

    @Column({type: 'bigint'})
    user_id: bigint

    @Column({ type: "text", nullable: true })
    comments: string

    @ManyToOne(() => Course, course => course.courseenrols, {
        onDelete: 'CASCADE'
    })
    courses: Course;

 }