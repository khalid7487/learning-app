import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddCourseEnrol, CouseWiseStudent, CouseWiseTeacher } from "./CourseEnrol.service";
let path = require('path')
const fileUpload = require('express-fileupload');

const router = Router()

router.get('/get-all', auth, async (req: Request, res: Response) => {

    return res.status(201).json("test")
})


router.post('/add', auth, async (req: Request, res: Response) => {

    let sceduleEnrol = await AddCourseEnrol(req, res)
    return res.status(201).json(sceduleEnrol)
})

router.get('/couse-wise-student/:courseId', auth, async (req: Request, res: Response) => {
    let sceduleEnrol = await CouseWiseStudent(req, res)
    return res.status(201).json(sceduleEnrol)
})

router.get('/couse-wise-teacher/:courseId', auth, async (req: Request, res: Response) => {
    let sceduleEnrol = await CouseWiseTeacher(req, res)
    return res.status(201).json(sceduleEnrol)
})

export default router