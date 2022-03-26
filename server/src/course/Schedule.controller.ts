import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddSchedule, DeleteScheduleById, GetAllSchedule, GetScheById,  GetScheduleWiseUser,  UpdateSchedule, UpdateScheduleStatus } from "./Schedule.service";
let path = require('path')
const fileUpload = require('express-fileupload');

const router = Router()


router.post('/add', auth, async (req: Request, res: Response) => {

    let vechicletrip = await AddSchedule(req, res)
    return res.status(201).json(vechicletrip)
})

//Update 
router.put('/update-schedule/:scheduleId', auth, async (req: any, res: Response) => {
    let tripInfo = await UpdateSchedule(req, res)
    return res.status(200).json(tripInfo)
})

//status
router.put('/update-status/:scheduleId', auth, async (req: any, res: Response) => {
    let tripStatusInfo = await UpdateScheduleStatus(req, res);
    return res.status(200).json(tripStatusInfo)
})

//Get all schedule
router.post('/getall', auth, async (req: Request, res: Response) => {
    let allschedule = await GetAllSchedule(req, res)
    return res.status(200).json(allschedule)
})

//Get all schedule by id 
router.get('/get/:scheduleId', auth, async (req: any, res: Response) => {  
    let courseInfo = await GetScheById(req, res);
    return res.status(200).json(courseInfo)
})

//delete id 
router.delete('/delete/:scheduleId', auth, async (req: any, res: Response) => {
    let deleteMessage = await DeleteScheduleById(req, res);
    return res.status(200).json({ message: deleteMessage})
})

//Course wise user 
router.get('/get-schedule-wise-user/:scheduleId',  async (req: Request, res: Response) => {

    let user = await GetScheduleWiseUser(req, res)
    return res.status(200).json(user)
})

export default router
