import { validate } from "class-validator"
import { User } from "../auth/User.entity"
import { TeacherPosts } from "../posts/TeacherPosts.entity"
import { TeacherPostEnrol } from "./TeacherPostEnrol.entity"

export const AddTeacherPostEnrol = async (req, res) => {

    let studentPost = req.body

    const {
        teacher_post_id, //post id
        teacher_id, //  who post
        user_id, //enrol id
        comments 
    } = studentPost


    try {

        // Validate date
        let errors: any = {}

        const userExists = await  User.findOne({ id: user_id });
        const teacherPostsExists = await  TeacherPosts.findOne({ id: teacher_post_id });

        const orderExist = await TeacherPostEnrol.findOne({
            where: { user_id: user_id, teacher_id: teacher_id, teacher_post_id: teacher_post_id }
        })


        if (!userExists) errors.course = 'User does not exists';
        if (!teacherPostsExists) errors.course = 'Post does not exists';
        if (orderExist) errors.enrol = 'Enrol is already pending';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        // courseExists.total_enrolled = courseExists.total_enrolled + 1
        // await courseExists.save()

        //create teacher posts enrol 
        const teacherPostEnrol = new TeacherPostEnrol({
            teacher_post_id,
            teacher_id,
            user_id,
            price_per_month:teacherPostsExists.price_per_month,
            area_covered:teacherPostsExists.area_covered,
            preffered_version:teacherPostsExists.preffered_version,
            preffered_class:teacherPostsExists.preffered_class,
            preffered_subject:teacherPostsExists.preffered_subject,
            preffered_time:teacherPostsExists.preffered_time,
            comments
        })

        //    validation
        errors = await validate(teacherPostEnrol)
        if (errors.length > 0) return res.status(400).json({ errors })

        await teacherPostEnrol.save()

        //    Return the user
        return teacherPostEnrol

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}