import { validate } from "class-validator"
import { Schedule } from "../course/Schedule.entity"
import { ScheduleEnrol } from "./ScheduleEnrol.entity"

export const AddScheduleEnrol = async (req, res) => {

    let scheduleEnrol = req.body

    const {
        teacher_id,
        user_id,
        schedules
    } = scheduleEnrol


    try {

        // Validate date
        let errors: any = {}
        const scheduleExists = await Schedule.findOne({ id: schedules });
        
        const orderExist = await ScheduleEnrol.findOne({ where: { user_id: user_id} })

        if(!scheduleExists) errors.vehicle = 'Schedule does not exists';
        if(orderExist)  errors.enrol = 'Enrol is already pending';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        //create vehicle trip 
        const schedule = new ScheduleEnrol({
            teacher_id,
            user_id,
            meeting_url: scheduleExists.meeting_url,
            schedules
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
