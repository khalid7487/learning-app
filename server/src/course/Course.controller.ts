import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddCourse, DeleteCourseById, GetAllCourse, GetCourseById, GetCourseWiseUser, Home, UpdateCourse, UpdateCourseStatus } from "./Course.service";
let path = require('path')
const fileUpload = require('express-fileupload');

const router = Router()

//Add 
router.post('/add', auth, async (req: any, res: Response) => {
    let course = await AddCourse(req, res);
    return res.status(201).json(course)
})

//Update
router.put('/update-course/:courseId', auth, async (req: any, res: Response) => {
    let courseInfo = await UpdateCourse(req, res);
    return res.status(200).json(courseInfo)
})

//status
router.put('/update-status/:vehicleId', auth, async (req: any, res: Response) => {

    let status = await UpdateCourseStatus(req, res)
    return res.status(200).json(status)

})

//Get all course
router.post('/getall', auth, async (req: Request, res: Response) => {
    let allvehicle = await GetAllCourse(req, res)
    return res.status(200).json(allvehicle)
})

// get one by id
router.get('/get/:courseId', auth, async (req: any, res: Response) => {  
    let courseInfo = await GetCourseById(req, res);
    return res.status(200).json(courseInfo)
})

//delete id 
router.delete('/delete/:courseId', auth, async (req: any, res: Response) => {
    let deleteMessage = await DeleteCourseById(req, res);
    return res.status(200).json({  message: deleteMessage })
})

//Get all vehicle
router.post('/home', async (req: Request, res: Response) => {
    let all_active_course = await Home(req, res);
    return res.status(200).json(all_active_course)

})

//Course wise user 
router.get('/get-course-wise-user/:courseId',  async (req: Request, res: Response) => {

    let user = await GetCourseWiseUser(req, res)
    return res.status(200).json(user)
})

export default router
