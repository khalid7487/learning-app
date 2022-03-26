import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/User.entity";
import {CoreEntity} from "../commons/CoreEntity";
import { Schedule } from "../course/Schedule.entity";


@Entity()
export class ScheduleEnrol extends CoreEntity {

    constructor(scheduleEnrol: Partial<ScheduleEnrol>) {
        super()
        Object.assign(this, scheduleEnrol)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({type: "text"})
    meeting_url: string

    @Column({type: 'bigint'})
    teacher_id: bigint

    @Column({type: 'bigint'})
    user_id: bigint

    @ManyToOne(() => Schedule, schedule => schedule.scheduleenrol, {
        onDelete: 'CASCADE'
    })
    schedules: Schedule;

 }