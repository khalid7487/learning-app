import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddStudentPostEnrol } from "./StudentPostEnrol.service";

const router = Router()

router.post('/student-post-enrol', auth, async (req: Request, res: Response) => {

    let sceduleEnrol = await AddStudentPostEnrol(req, res)
    return res.status(201).json(sceduleEnrol)
})



export default router
