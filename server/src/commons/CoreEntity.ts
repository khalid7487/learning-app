import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export class CoreEntity extends BaseEntity {

    @Column({nullable: true, default: "CRUDV"})
    actions: string

    @Column({type: "varchar", nullable: true})
    created_by: string

    @Column({type: "varchar", nullable: true})
    updated_by: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}