import { validate } from "class-validator"
import path from "path"
import { Between, createQueryBuilder, ILike, Like } from "typeorm"
import { User } from "../auth/User.entity"
import { FindUser } from "../commons/Utils"
import { Course } from "./Course.entity"
import fs from 'fs'

export const AddCourse = async (req, res) => {
    let phone = FindUser(req, res);
    console.log(phone);

    let course_photo1_filename = "";
    let course_photo2_filename = "";


    let time = new Date().getTime()

    if (req.files) {

        let {
            course_photo1, course_photo2
        } = req.files

        if (course_photo1) {
            course_photo1_filename = `${phone}/course_photo1_${time}${path.extname(course_photo1.name)}`;
            course_photo1.mv(`./uploads/${course_photo1_filename}`)
        }
        if (course_photo2) {
            course_photo2_filename = `${phone}/course_photo2_${time}${path.extname(course_photo2.name)}`;
            course_photo2.mv(`./uploads/${course_photo2_filename}`)
        }
    }

    let course = req.body

    const {
        course_type,
        price,
        tutor_type,
        name,
        description,
        certification,
        total_duration,
        start_date,
        end_date,
        minimum_participant,
        maximum_participant,
        course_video_url,
        user
    } = course

    // console.log("user",user);

    try {

        //create Vechicle
        const course = new Course({
            course_type,
            tutor_type,
            price,
            name,
            description,
            certification,
            total_duration,
            start_date,
            end_date,
            minimum_participant,
            maximum_participant,
            course_video_url,
            course_photo1: course_photo1_filename,
            course_photo2: course_photo2_filename,
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

export const UpdateCourse = async (req, res) => {
    const id = req.params.courseId
    let vehicle = req.body

    let phone = FindUser(req, res);
    console.log(phone);

    let errors: any = {}

    const courseInfo = await Course.findOneOrFail({ id: id })
    if (!courseInfo) errors.vehicle = 'CourseInfo does not exists';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }


    let course_photo1_filename = "";
    let course_photo2_filename = "";


    let time = new Date().getTime()

    if (req.files) {

        let { course_photo1, course_photo2 } = req.files


        if (course_photo1) {
            course_photo1_filename = `${phone}/course_photo1_${time}${path.extname(course_photo1.name)}`;
            if (courseInfo.course_photo1) {
                fs.unlinkSync(`./uploads/${courseInfo.course_photo1}`);
            }
            course_photo1.mv(`./uploads/${course_photo1_filename}`)
        }
        if (course_photo2) {
            course_photo2_filename = `${phone}/course_photo2_${time}${path.extname(course_photo2.name)}`;
            if (courseInfo.course_photo2) {
                fs.unlinkSync(`./uploads/${courseInfo.course_photo2}`);
            }
            course_photo2.mv(`./uploads/${course_photo2_filename}`)
        }



    }


    const {
        course_type,
        tutor_type,
        price,
        name,
        description,
        certification,
        total_duration,
        start_date,
        end_date,
        minimum_participant,
        maximum_participant,
        course_video_url,
    } = vehicle

    try {


        courseInfo.course_type = course_type || courseInfo.course_type
        courseInfo.tutor_type = tutor_type || courseInfo.tutor_type
        courseInfo.price = price || courseInfo.price
        courseInfo.name = name || courseInfo.name
        courseInfo.description = description || courseInfo.description
        courseInfo.certification = certification || courseInfo.certification
        courseInfo.total_duration = total_duration || courseInfo.total_duration
        courseInfo.start_date = start_date || courseInfo.start_date
        courseInfo.end_date = end_date || courseInfo.end_date
        courseInfo.minimum_participant = minimum_participant || courseInfo.minimum_participant
        courseInfo.maximum_participant = maximum_participant || courseInfo.maximum_participant
        courseInfo.course_video_url = course_video_url || courseInfo.course_video_url

        //update photos
        courseInfo.course_photo1 = course_photo1_filename || courseInfo.course_photo1
        courseInfo.course_photo2 = course_photo2_filename || courseInfo.course_photo2

        await courseInfo.save()

        return courseInfo

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const UpdateCourseStatus = async (req, res) => {
    const id = req.params.vehicleId
    let activeStatus = req.body

    const { status } = activeStatus

    try {
        const course = await Course.findOneOrFail({ id: id })
        course.status = status || course.status

        await course.save()
        return course

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}

export const DeleteCourseById = async (req, res) => {
    const id = req.params.courseId;
    try {
        const course = await Course.findOneOrFail({ id: id })

        await course.remove()

        return 'Course deleted successfully'
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const GetAllCourse = async (req, res) => {
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

    console.log(filter)

    const limit = course.limit || 10
    const page = course.page || 1;
    const offset = (page - 1) * limit;

    let [result, total] = await Course.findAndCount({
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

export const GetCourseById = async (req, res) => {
    let { courseId } = req.params

    const courseInfo = await Course.findOne({ id: courseId })
    return courseInfo
}

export const Home = async (req, res) => {
    let schedule = req.body
    const {
        from_location,
        to_location,
        trip_type,
        from_date,
        to_date,
    } = schedule


    // const fromlocationLowarecase =Raw(alias =>`LOWER(${alias}) Like '%${from_location.toLowerCase()}%'`);
    // const tolocationLowarecase =Raw(alias =>`LOWER(${alias}) Like '%${to_location.toLowerCase()}%'`);


    let filter = [];

    // if (from_location && to_location && trip_type) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: 1
    // }]
    // else if (from_location && trip_type) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: 1
    // }]
    // else if (trip_type && to_location) filter = [...filter,
    // {
    //     trip_type: ILike(`%${trip_type}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     vehicletrip_status: 1
    // }]
    // else if (from_location && to_location) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     vehicletrip_status: 1
    // }]

    // else if (from_location) filter = [...filter,
    // {
    //     // Like('%' +from_location + '%'),
    //     // from_location: fromlocationLowarecase, 
    //     from_location: ILike(`%${from_location}%`),
    //     vehicletrip_status: 1
    // }]
    // else if (trip_type) filter = [...filter,
    // {
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: 1
    // }]
    // else if (to_location) filter = [...filter,
    // {
    //     to_location: ILike(`%${to_location}%`),
    //     vehicletrip_status: 1
    // }]
    // else {
    //     filter = [...filter, {
    //         vehicletrip_status: 1
    //     }]
    // }


    console.log('filter', filter);

    const limit = schedule.limit || 10
    const page = schedule.page || 1;
    const offset = (page - 1) * limit;

    const [result, total] = await Course.findAndCount({
        // where: filter,
        where: { status: 1 },
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    });

    return {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
}

export const GetCourseWiseUser = async (req, res) => {
    let { courseId }: any = req.params
    console.log(courseId)
    try {

        let errors: any = {}
        const vehicleExists = await Course.findOne({ id: courseId })
        // console.log(vehicleTripExists)
        if (!vehicleExists) errors.vehicle = 'Course does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        const user = await createQueryBuilder("User", "u")
            .innerJoin(Course, 'c', 'c.userId = u.id')
            .where("c.id = :id", { id: courseId })
            .getOne()


        return user

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}


/*



export const GetUserIdWiseVehicle = async (req, res) => {
    let { userId } = req.params

    let allvehicle = await User.find({
        where: { id: userId },
        relations: ["vehicles"]
    });

    return allvehicle
}

export const GetUserWiseVehicleTrips = async (req, res) => {
    let { userId } = req.params

    let allvehicle = await Teacher.find({
        where: { user: userId },
        relations: ["vehicleTrips"]
    });
    return allvehicle
}

export const PostUserWiseVehicleTrips = async (req, res) => {
    let trip = req.body

    const {
        from_location,
        to_location,
        trip_type,
        vehicletrip_status,
        userId,
    } = trip

    // let filter = [];

    // if (from_location && to_location && trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     trip_type: Like('%' + trip_type + '%'),
    //     vehicletrip_status: vehicletrip_status,

    // }]
    // else if (from_location && to_location && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     vehicletrip_status: vehicletrip_status,
    // }]
    // else if (to_location && trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     to_location: ILike(`%${to_location}%`),
    //     trip_type: Like('%' + trip_type + '%'),
    //     vehicletrip_status: vehicletrip_status,
    // }]

    // else if (from_location && trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     trip_type: Like('%' + trip_type + '%'),
    //     vehicletrip_status: vehicletrip_status,
    // }]
    // else if (from_location && trip_type) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     trip_type: Like('%' + trip_type + '%')
    // }]
    // else if (trip_type && to_location) filter = [...filter,
    // {
    //     trip_type: Like('%' + trip_type + '%'),
    //     to_location: ILike(`%${to_location}%`)
    // }]
    // else if (from_location && to_location) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`)
    // }]
    // else if (from_location && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     vehicletrip_status: vehicletrip_status
    // }]
    // else if (to_location && vehicletrip_status) filter = [...filter,
    // {
    //     to_location: ILike(`%${to_location}%`),
    //     vehicletrip_status: vehicletrip_status
    // }]
    // else if (trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     trip_type: Like('%' + trip_type + '%'),
    //     vehicletrip_status: vehicletrip_status
    // }]

    // else if (from_location) filter = [...filter,
    // {
    //     user: userId,
    //     vehicleTrips: {
    //         from_location: ILike(`%${from_location}%`)
    //     },

    // }]
    // else if (trip_type) filter = [...filter,
    // {
    //     trip_type: Like('%' + trip_type + '%')
    // }]
    // else if (to_location) filter = [...filter,
    // {
    //     to_location: ILike(`%${to_location}%`)
    // }]
    // else if (vehicletrip_status) filter = [...filter,
    // {
    //     vehicletrip_status: vehicletrip_status
    // }]
    // else {
    //     filter = [...filter, {
    //         user: userId
    //     }]
    // }

    // console.log(filter)

    const limit = trip.limit || 10
    const page = trip.page || 1;
    const offset = (page - 1) * limit;

    let [result, total] = await Teacher.findAndCount({
        where: {
            // user: userId,
            vehicleTrips: {
                from_location: ILike(`%${from_location}%`)
            }
        },
        relations: ["vehicleTrips"],
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    });

    return {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
}

export const GetVehicleIdWiseVehicleTrips = async (req, res) => {
    let { vehicleId }: any = req.params

    try {

        let errors: any = {}
        const vehicleExists = await Teacher.findOne({ id: vehicleId })
        if (!vehicleExists) errors.vehicle = 'Vehicle does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }


        const vehicle_trips = await createQueryBuilder("VehicleTrip", "vt")
            // .innerJoinAndSelect("VehicleTrip.vehicle", "vehicle")
            // .innerJoinAndSelect("vehicle.user", "user")
            .innerJoin(Teacher, 'v', 'vt.vehicleId = v.id')
            .where("v.id = :id", { id: vehicleId })
            .getMany()

        vehicle_trips.map(trip => { trip['vehicle'] = vehicleExists });
        return vehicle_trips

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}



export const CountTotalVehilce = async (req, res) => {

    try {
        const count = await Teacher.count()
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}

export const ToDayTotalVehicle = async (req, res) => {

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    console.log(start)
    const end = new Date(start);
    end.setDate(start.getDate() + 1)
    console.log(end)

    try {
        const count = await Teacher.count({
            where: {
                create_at: Between(start, end),
            }
        })
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const PreviousDayTotalVehicle = async (req, res) => {

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    console.log(start)
    const end = new Date(start);
    end.setDate(start.getDate() - 1)
    console.log(end)

    try {
        const count = await Teacher.count({
            where: {
                create_at: Between(end, start),
            }
        })
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const PreviousWeekTotalVehicle = async (req, res) => {

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    console.log(start)
    const end = new Date(start);
    end.setDate(start.getDate() - 7)
    console.log(end)

    try {
        const count = await Teacher.count({
            where: {
                create_at: Between(end, start),
            }
        })
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const PreviousMonthTotalVehicle = async (req, res) => {

    const endOfPreviousMonth = new Date();
    // endOfPreviousMonth.setHours(0, 0, 0, 0);
    endOfPreviousMonth.setMonth(endOfPreviousMonth.getMonth(), 0);
    console.log(endOfPreviousMonth)
    const startOfPreviousMonth = new Date();
    startOfPreviousMonth.setMonth(startOfPreviousMonth.getMonth() - 1, 1);
    console.log(startOfPreviousMonth)

    try {
        const count = await Teacher.count({
            where: {
                create_at: Between(startOfPreviousMonth, endOfPreviousMonth),
            }
        })
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

*/
