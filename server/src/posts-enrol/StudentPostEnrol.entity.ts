import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CoreEntity} from "../commons/CoreEntity";


@Entity()
export class StudnetPostEnrol extends CoreEntity {

    constructor(studnetPostEnrol: Partial<StudnetPostEnrol>) {
        super()
        Object.assign(this, studnetPostEnrol)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({type: 'bigint'})
    user_id: bigint
    
    @Column({type: 'bigint'})
    teacher_id: bigint

    @Column({type: 'bigint'})
    user_post_id: bigint

    @Column({default: 0})
    price_per_month: number

    @Column({type: "text"})
    location: string

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