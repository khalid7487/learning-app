import { validate } from "class-validator"
import { createQueryBuilder, ILike } from "typeorm"
import { Schedule } from "./Schedule.entity"

export const AddSchedule = async (req, res) => {

    let schedule = req.body

    const {
        start,
        end,
        price,
        name,
        description,
        location,
        duration,
        meeting_url,
        schedule_type,
        user
    } = schedule

    try {

        // Validate date
        let errors: any = {}

        //create vehicle trip 
        const schedule = new Schedule({
            start,
            price,
            end,
            name,
            description,
            location,
            duration,
            meeting_url,
            schedule_type,
            user
        })

        //validation
        errors = await validate(schedule)
        if (errors.length > 0) return res.status(400).json({ errors })

        await schedule.save()

        // Return the user
        return schedule

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const UpdateSchedule = async (req, res) => {
    const id = req.params.scheduleId
    let schedule = req.body
    const {
        start,
        price,
        end,
        name,
        description,
        location,
        duration,
        meeting_url,
        schedule_type,
    } = schedule

    try {

        const scheduleinfo = await Schedule.findOneOrFail({ id: id })

        scheduleinfo.start = start || scheduleinfo.start
        scheduleinfo.price = price || scheduleinfo.price
        scheduleinfo.end = end || scheduleinfo.end
        scheduleinfo.name = name || scheduleinfo.name
        scheduleinfo.description = description || scheduleinfo.description
        scheduleinfo.location = location || scheduleinfo.location
        scheduleinfo.duration = duration || scheduleinfo.duration
        scheduleinfo.meeting_url = meeting_url || scheduleinfo.meeting_url
        scheduleinfo.schedule_type = schedule_type || scheduleinfo.schedule_type

        await scheduleinfo.save()

        return scheduleinfo

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }
}

export const UpdateScheduleStatus = async (req, res) => {
    const id = req.params.scheduleId
    let tripStatus = req.body

    const {
        status
    } = tripStatus

    try {
        const tripStatusInfo = await Schedule.findOneOrFail({ id: id })

        tripStatusInfo.status = status || tripStatusInfo.status

        await tripStatusInfo.save()

        return tripStatusInfo

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const GetAllSchedule = async (req, res) => {
    let schedule = req.body


    const {
        from_location,
        to_location,
        trip_type,
        vehicletrip_status,
        userId,
    } = schedule

    let filter = [];

    if (userId) filter = [...filter,
    {
        user: userId
    }]
    else {
        filter = [...filter]
    }

    // if (from_location && to_location && trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     to_location: ILike(`%${to_location}%`),
    //     trip_type: ILike(`%${trip_type}%`),
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
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: vehicletrip_status,
    // }]

    // else if (from_location && trip_type && vehicletrip_status) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: vehicletrip_status,
    // }]
    // else if (from_location && trip_type) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`),
    //     trip_type: ILike(`%${trip_type}%`)
    // }]
    // else if (trip_type && to_location) filter = [...filter,
    // {
    //     trip_type: ILike(`%${trip_type}%`),
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
    //     trip_type: ILike(`%${trip_type}%`),
    //     vehicletrip_status: vehicletrip_status
    // }]
    // else if (from_location) filter = [...filter,
    // {
    //     from_location: ILike(`%${from_location}%`)
    // }]
    // else if (trip_type) filter = [...filter,
    // {
    //     trip_type: ILike(`%${trip_type}%`)
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
    //     filter = [...filter]
    // }

    const limit = schedule.limit || 10
    const page = schedule.page || 1;
    const offset = (page - 1) * limit;
    console.log(filter)
    let [result, total] = await Schedule.findAndCount({
        where: filter,
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    });
    // return allvehicletrip;



    return {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
}

export const DeleteScheduleById = async (req, res) => {
    const id = req.params.scheduleId;
    console.log("delete", id);

    try {
        const schedule = await Schedule.findOneOrFail({ id: id })

        await schedule.remove()

        return 'Schedule deleted successfully'
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export const GetScheById = async (req, res) => {
    let { scheduleId } = req.params

    const courseInfo = await Schedule.findOne({ id: scheduleId })
    return courseInfo
}

export const GetScheduleWiseUser = async (req, res) => {
    let { scheduleId }: any = req.params
    console.log(scheduleId)
    try {

        let errors: any = {}
        const vehicleExists = await Schedule.findOne({ id: scheduleId })
        // console.log(vehicleTripExists)
        if (!vehicleExists) errors.schedule = 'Schedule does not exists';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        const user = await createQueryBuilder("User", "u")
            .innerJoin(Schedule, 's', 's.userId = u.id')
            .where("s.id = :id", { id: scheduleId })
            .getOne()


        return user

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}


