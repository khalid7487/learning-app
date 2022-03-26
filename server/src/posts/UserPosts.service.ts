import { createQueryBuilder } from "typeorm"
import { UserPosts } from "./UserPosts.entity"

export const AddUserPosts = async (req, res) => {

    let course = req.body

    const {
        tutor_type,
        price_per_month,
        number_of_days_in_week,
        location,
        teaching_subject,
        preffered_version,
        preffered_class,
        preffered_subject,
        preffered_time,
        description,
        user
    } = course

    // console.log("user",user);

    try {

        //create Vechicle
        const course = new UserPosts({
            tutor_type,
            price_per_month,
            number_of_days_in_week,
            location,
            teaching_subject,
            preffered_version,
            preffered_class,
            preffered_subject,
            preffered_time,
            description,
            user: user,
        })

        await course.save()

        // Return the user
        return course


    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const UpdateUserPosts = async (req, res) => {
    const id = req.params.postsId
    let teacherPosts = req.body

    let errors: any = {}

    const teacherPostInfo = await UserPosts.findOne({ id: id })
    if (!teacherPostInfo) errors.teacherPosts = 'Teacher posts does not exists';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }




    const {
        tutor_type,
        price_per_month,
        number_of_days_in_week,
        location,
        teaching_subject,
        preffered_version,
        preffered_class,
        preffered_subject,
        preffered_time,
        description,
    } = teacherPosts

    try {
        teacherPostInfo.tutor_type = tutor_type || teacherPostInfo.tutor_type
        teacherPostInfo.price_per_month = price_per_month || teacherPostInfo.price_per_month
        teacherPostInfo.number_of_days_in_week = number_of_days_in_week || teacherPostInfo.number_of_days_in_week
        teacherPostInfo.location = location || teacherPostInfo.location
        teacherPostInfo.teaching_subject = teaching_subject || teacherPostInfo.teaching_subject
        teacherPostInfo.preffered_version = preffered_version || teacherPostInfo.preffered_version
        teacherPostInfo.preffered_class = preffered_class || teacherPostInfo.preffered_class
        teacherPostInfo.preffered_subject = preffered_subject || teacherPostInfo.preffered_subject
        teacherPostInfo.preffered_time = preffered_time || teacherPostInfo.preffered_time
        teacherPostInfo.description = description || teacherPostInfo.description
 
        await teacherPostInfo.save()

        return teacherPostInfo

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const UpdateUserPostsStatus = async (req, res) => {
    const id = req.params.postsId
    let activeStatus = req.body

    const { status } = activeStatus

    try {
        const course = await UserPosts.findOneOrFail({ id: id })
        course.status = status || course.status

        await course.save()
        return course

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const GetAllUserPosts = async (req, res) => {
    let course = req.body
    const {
        id,
        vehicle_status,
        userId
    } = course

    let filter = [];

    if (userId) filter = [...filter,
    {
        user: userId
    }]
    else {
        filter = [...filter]
    }

    // if (id && vehicle_status && userId) filter = [...filter,
    // {
    //     id: id,
    //     vehicle_status: vehicle_status,
    //     user: userId
    // }]
    // else if (id && vehicle_status) filter = [...filter,
    // {
    //     id: id,
    //     vehicle_status: vehicle_status,
    // }]
    // else if (id && userId) filter = [...filter,
    // {
    //     id: id,
    //     user: userId
    // }]
    // else if (vehicle_status && userId) filter = [...filter,
    // {
    //     vehicle_status: vehicle_status,
    //     user: userId
    // }]
    // else if (vehicle_status) filter = [...filter,
    // {
    //     vehicle_status: vehicle_status
    // }]
    // else if (id) filter = [...filter,
    // {
    //     id: id
    // }]
    // else if (userId) filter = [...filter,
    // {
    //     user: userId
    // }]
    // else {
    //     filter = [...filter]
    // }

    // console.log(filter)

    const limit = course.limit || 10
    const page = course.page || 1;
    const offset = (page - 1) * limit;

    let [result, total] = await UserPosts.findAndCount({
        where: filter,
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    });

    // return allvehicle;

    return {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
}

export const GetUserPostsById = async (req, res) => {
    let { postsId } = req.params

    const courseInfo = await UserPosts.findOne({ id: postsId })
    return courseInfo
}

export const DeleteUserPostsById = async (req, res) => {
    const id = req.params.postId;
    try {
        const teacherPosts = await UserPosts.findOneOrFail({ id: id })

        await teacherPosts.remove()

        return 'Teacher Posts deleted successfully'
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const GetUserPostsWiseUser = async (req, res) => {
    let { postId }: any = req.params
    console.log(postId)
    try {

        let errors: any = {}
        const teacherPostsExists = await UserPosts.findOne({ id: postId })
        // console.log(vehicleTripExists)
        if (!teacherPostsExists) errors.posts = 'Teacher posts does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        const user = await createQueryBuilder("User", "u")
            .innerJoin(UserPosts, 'c', 'c.userId = u.id')
            .where("c.id = :id", { id: postId })
            .getOne()


        return user

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}