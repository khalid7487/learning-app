import {Request, Response, Router} from "express";
import auth from "../middleware/auth";
import {AllPublicTeachers, CountTotalDriver, GetUserwiseSchdule} from "./User.service";
import {CountTotalUser, DeleteById} from "./Auth.service";

const fileUpload = require('express-fileupload');
const router = Router()


//write api below

//get all teachers
router.post('/all-teachers', async (req: Request, res: Response) => {
    let alldriver = await AllPublicTeachers(req, res);
    return res.status(200).json(alldriver)
})

//delete by id
router.delete('/delete-by-id/:userId', auth, async (req: any, res: Response) => {
    const id = req.params.userId

    let message = await DeleteById(id, res)

    return res.status(200).json({message: message})

})

//count total user
router.get('/total-users-count', auth, async (req: Request, res: Response) => {
    let countVehicle = await CountTotalUser(req, res)
    return res.status(200).json(countVehicle)
})

//Count total Driver
router.get('/total-teachers-counts', auth, async (req: Request, res: Response) => {
    let countVehicle = await CountTotalDriver(req, res)
    return res.status(200).json(countVehicle)
})

//user wise schdule
router.get('/get-user-wise-schdule/:userId',  async (req: Request, res: Response) => {

    let user = await GetUserwiseSchdule(req, res)
    return res.status(200).json(user)
})


export default router
