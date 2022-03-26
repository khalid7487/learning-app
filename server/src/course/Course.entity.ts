import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/User.entity";
import {CoreEntity} from "../commons/CoreEntity";
import { CourseEnrol } from "../enrol/CourseEnrol.entity";
import {Schedule} from "./Schedule.entity";

@Entity()
export class Course extends CoreEntity {


    constructor(course: Partial<Course>) {
        super()
        Object.assign(this, course)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({default: 1})
    status: number          // 0 -> pending 1-> Active

    @Column({default: 0})
    tutor_type: number          // 0 -> Physical 1-> Virtual

    @Column({default: 0})
    course_type: number             // 0-> Trail, 1-> Full Payment, 2-> Regular, 3-> Demo Class,4-> Monthly,5-> Weekly

    @Column({default: 0})
    price: number


    @Column({type: "text"})
    name: string


    @Column({nullable: true})       // we will map that later
    category: string


    @Column({type: "text"})
    description: string


    @Column({default: 0})
    certification: number


    @Column({default: 0})           // we will map that later
    quiz: number


    @Column()
    total_duration: number

    @Column({type: "date", nullable: true})
    start_date: string

    @Column({type: "date", nullable: true})
    end_date: string


    @Column({default: 0})
    total_enrolled: number

    @Column({default: 0})
    minimum_participant: number


    @Column({default: -1})          // -1 mean unlimited
    maximum_participant: number


    @Column({default: 0})
    rating: number


    // vehicle image
    @Column({type: "text", nullable: true})
    course_photo1: string

    @Column({type: "text", nullable: true})
    course_photo2: string


    @Column({type: "text", nullable: true})
    course_video_url: string


    @ManyToOne(() => User, user => user.courses, {
        onDelete: 'CASCADE'
    })
    user: User;

    @OneToMany(() => CourseEnrol, courseEnrol => courseEnrol.courses, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    courseenrols: CourseEnrol[];


}