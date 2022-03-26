import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddScheduleEnrol } from "./ScheduleEnrol.service";
let path = require('path')
const fileUpload = require('express-fileupload');

const router = Router()

router.post('/add', auth, async (req: Request, res: Response) => {

    let sceduleEnrol = await AddScheduleEnrol(req, res)
    return res.status(201).json(sceduleEnrol)
})

export default router