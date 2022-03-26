import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {CoreEntity} from "../commons/CoreEntity";

@Entity()
export class News extends CoreEntity {

    constructor(news: Partial<News>) {
        super()
        Object.assign(this, news)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({type: "text"})
    title: string

    @Column({type: "text"})
    description: string

    @Column({type: "text"})
    image_url: string

    @Column({type: "text"})
    video_url: string


    @Column({type: "text"})
    promo_code: string

    @Column({default: 0, type: 'bigint'}) // Recommended
    promo_expire_date: string;

    @Column({default: 0}) // Recommended
    promo_discount_amount: number;

    @Column({default: 0}) // Recommended
    promo_discount_type: number; // 1 -> fix amount  2-> percentage 

    // @Column({ type: 'timestamptz' })
    // validate: Date;

}