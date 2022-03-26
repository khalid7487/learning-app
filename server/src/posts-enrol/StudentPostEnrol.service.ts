import { validate } from "class-validator"
import { User } from "../auth/User.entity"
import { UserPosts } from "../posts/UserPosts.entity"
import { StudnetPostEnrol } from "./StudentPostEnrol.entity"

export const AddStudentPostEnrol = async (req, res) => {

    let studentPost = req.body

    const {
        user_post_id, //post id
        teacher_id, // enrol id
        user_id, //user_id who post
        comments 
    } = studentPost


    try {

        // Validate date
        let errors: any = {}

        const userExists = await  User.findOne({ id: teacher_id });
        const userPostsExists = await  UserPosts.findOne({ id: user_post_id });

        const orderExist = await StudnetPostEnrol.findOne({
            where: { user_id: user_id, teacher_id: teacher_id, user_post_id: user_post_id }
        })


        if (!userExists) errors.course = 'User does not exists';
        if (!userPostsExists) errors.course = 'Post does not exists';
        if (orderExist) errors.enrol = 'Enrol is already pending';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        // courseExists.total_enrolled = courseExists.total_enrolled + 1
        // await courseExists.save()

        //create user posts enrol 
        const userPostsEnrol = new StudnetPostEnrol({
            user_post_id,
            teacher_id,
            user_id,
            price_per_month:userPostsExists.price_per_month,
            location:userPostsExists.location,
            preffered_version:userPostsExists.preffered_version,
            preffered_class:userPostsExists.preffered_class,
            preffered_subject:userPostsExists.preffered_subject,
            preffered_time:userPostsExists.preffered_time,
            comments
        })

        //    validation
        errors = await validate(userPostsEnrol)
        if (errors.length > 0) return res.status(400).json({ errors })

        await userPostsEnrol.save()

        //    Return the user
        return userPostsEnrol

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

