import { validate } from "class-validator"
import { GetUserById } from "../auth/Auth.service"
import { User } from "../auth/User.entity"
import { Course } from "../course/Course.entity"
import { Schedule } from "../course/Schedule.entity"
import { CourseEnrol } from "./CourseEnrol.entity"
import { ScheduleEnrol } from "./ScheduleEnrol.entity"

export const AddCourseEnrol = async (req, res) => {

    let courseEnrol = req.body

    const {
        teacher_id,
        user_id,
        courses,
        comments
    } = courseEnrol


    try {

        // Validate date
        let errors: any = {}
        const courseExists = await Course.findOne({ id: courses });

        const orderExist = await CourseEnrol.findOne({
            where: { user_id: user_id, courses: courses }
        })


        if (!courseExists) errors.course = 'Course does not exists';
        if (orderExist) errors.enrol = 'Enrol is already pending';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }



        courseExists.total_enrolled = courseExists.total_enrolled + 1
        await courseExists.save()

        //create vehicle trip 
        const schedule = new CourseEnrol({
            teacher_id,
            user_id,
            courses,
            comments
        })

        //    validation
        errors = await validate(schedule)
        if (errors.length > 0) return res.status(400).json({ errors })

        await schedule.save()

        //    Return the user
        return schedule

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const CouseWiseStudent = async (req, res) => {
    const id = req.params.courseId

    let userFind = await CourseEnrol.find(
        { courses: id }
    );

    return userFind;
}

export const CouseWiseTeacher = async (req, res) => {
    const id = req.params.courseId

    let userFind = await CourseEnrol.find(
        { courses: id }
    );

    let enrolStudents = [];

    userFind.forEach(async (item, index) => {
        let userInfo = await User.findOne({ where: { id: item.user_id } })
        //console.log(userInfo)
        //enrolStudents.push(userInfo)
        userFind['student'] = userInfo
        return userFind
    })

    // userFind.map( async (item, index) => {
    //     let userInfo = await User.findOne({ where: { id: item.user_id } })
    //     console.log(userInfo)
    //     enrolStudents.push(userInfo)
    // })
    // console.log(enrolStudents)

    return userFind;
}


const studentFind = (students) => {

}