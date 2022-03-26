import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddTeacherPostEnrol } from "./TeacherPostEnrol.service";

const router = Router()

router.post('/teacher-post-enrol', auth, async (req: Request, res: Response) => {

    let sceduleEnrol = await AddTeacherPostEnrol(req, res)
    return res.status(201).json(sceduleEnrol)
})


export default router
