import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { Role } from "./Role.entity";
import { Course } from "../course/Course.entity";
import { Identity } from "./Identity.entity";
import { CoreEntity } from "../commons/CoreEntity";
import { Schedule } from "../course/Schedule.entity";
import { TeacherPosts } from "../posts/TeacherPosts.entity";
import { UserPosts } from "../posts/UserPosts.entity";

@Entity()
export class User extends CoreEntity {

    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    // @Exclude()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint

    @Column({ default: 0 })
    status: number          // 1, 2, 3, 4

    @Column()
    @Length(3, 255, { message: 'First Name must be at least 3 characters long' })
    firstname: string

    @Column({ nullable: true })
    @Length(3, 255, { message: 'Last name must be at least 3 characters long' })
    lastname: string

    @Index({ unique: true })
    @Column({ nullable: true })
    @IsEmail()
    email: string

    @Exclude()
    @Column()
    @Length(4, 255, { message: 'Password must be at least 6 characters long' })
    password: string

    @Index({ unique: true })
    @Column()
    @Length(11, 15, { message: 'Number must be 15 characters long' })
    phone: string

    @Column({ nullable: true })
    dateOfbirth: string

    @Index({ unique: true })
    @Column({ nullable: true })
    username: string


    @Column({ nullable: true })
    address: string


    @ManyToMany(() => Role, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    roles: Role[]

    // @OneToMany(() => Role, role => role.user, {
    //     nullable: true, cascade: true,
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    // })
    // roles: Role[];

    @OneToMany(() => Schedule, shedule => shedule.user, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    schedules: Schedule[];

    @Column({ nullable: true, default: 0 })
    trips: number


    @Column({ nullable: true, default: 0 })
    rating: number

    @Column({ nullable: true, default: 0 })
    total_rejection_trip: number

    @Column({ nullable: true, default: 0 })
    total_sucessful: number

    @Column({ nullable: true, default: 0 })
    total_trip: number


    @Column({ type: "text", nullable: true })
    profile_image: string

    @Column({ nullable: true })
    latitude: string

    @Column({ nullable: true })
    longitude: string


    @OneToMany(() => Course, course => course.user, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    courses: Course[];

    @OneToMany(() => TeacherPosts, teacherPosts => teacherPosts.user, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    teacherPosts: TeacherPosts[];

    @OneToMany(() => UserPosts, userPosts => userPosts.user, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    userPosts: UserPosts[];


    @OneToOne(() => Identity, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    identity: Identity;


    @Column({ nullable: true })
    short_bio: string

    @Column({ nullable: true })
    bio: string

    @Column({default: 0})
    user_type: number          // 0 -> Physical 1-> Virtual


    // social login Ids
    @Column({ nullable: true })
    github_user_id: string


    // Google 2fa Column

    @Column({ nullable: false })
    totp_secret: string;

    @Column({ type: "text" })
    totp_base64_string: string;


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    toJSON() {
        return classToPlain(this)
    }

}
