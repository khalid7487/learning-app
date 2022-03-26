import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/User.entity";
import { CoreEntity } from "../commons/CoreEntity";
import { ScheduleEnrol } from "../enrol/ScheduleEnrol.entity";
import { Course } from "./Course.entity";

@Entity()
export class Schedule extends CoreEntity {

    constructor(schedule: Partial<Schedule>) {
        super()
        Object.assign(this, schedule)
    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint


    // @Column({type: "date", nullable: true})
    // start: string


    // @Column({type: "date", nullable: true})
    // end: string

    @Column({ type: "timestamptz", nullable: true })
    start: Date


    @Column({ type: "timestamptz", nullable: true })
    end: Date

    @Column({ type: "text" })
    name: string

    @Column({default: 0})
    price: number

    @Column({ type: "text" })
    description: string


    @Column({ type: "text" })
    location: string              // google,zoom,offline,online


    @Column({ default: 0 })
    duration: number                // meeting duration


    @Column({ type: "text" })
    meeting_url: string


    @Column({ default: 1 })      // active/inactive [1=active | 0=inactive]
    status: number


    @Column({ default: 1 })
    schedule_type: number           // free/paid [1=paid | 0=free]

    @ManyToOne(() => User, user => user.schedules, {
        onDelete: 'CASCADE'
    })
    user: User;

    @OneToMany(() => ScheduleEnrol, shedule => shedule.schedules, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    scheduleenrol: ScheduleEnrol[];
}