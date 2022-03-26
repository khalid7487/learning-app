import {Request, Response, Router} from "express";
import cookie from "cookie";
import osutils from "os-utils"
import {User} from "./User.entity";

import auth from "../middleware/auth"
import {
    AddRegister,
    AddRoles,
    ChangePassword,
    GetRoleById,
    GetRoles,
    GetUserById,
    Login,
    UpdateProfile,
    UpdateRole,
    UpdateUserProfileImage,
    UserInfo,
    UserStatus
} from "./Auth.service";

const fileUpload = require('express-fileupload');


const router = Router()


router.post('/upload', async (req: any, res: Response) => {

    try {
        if (!req.files) {
            return res.status(200).json({status: false, message: 'No file uploaded'})
        } else {
            let file = req.files.avatar;

            file.mv('./uploads/' + file.name);

            //send response
            return res.status(200).json({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        return res.status(500).json(err)
    }

})

router.post('/register', async (req: any, res: Response) => {
    let user = await AddRegister(req, res);
    return res.status(201).json(user)
})

router.post('/login', async (req: Request, res: Response) => {

    let tokens = await Login(req, res)
    return res.json(tokens)

})

router.get('/roles', async (req: Request, res: Response) => {
    let allUsers = await GetRoles();
    return res.status(200).json(allUsers)
})

//get user by id
router.get('/get-role-by-id/:roleId', auth, async (req: any, res: Response) => {
    let userStatus = await GetRoleById(req, res);
    return res.status(200).json(userStatus)
})

router.post('/roles', auth, async (req: Request, res: Response) => {

    let roles = await AddRoles(req, res);
    return res.status(201).json(roles)

})

//update roles
router.put('/update-roles/:userId', auth, async (req: any, res: Response) => {

    let userRole = await UpdateRole(req, res);
    return res.status(200).json(userRole)
})


router.get('/me', auth, (req: Request, res: Response) => {
    return res.json(res.locals.user)
})

//get user by id
router.get('/get-user-by-id/:userId', auth, async (req: any, res: Response) => {
    let userStatus = await GetUserById(req, res);
    return res.status(200).json(userStatus)
})

router.post('/forget', auth, async (req: Request, res: Response) => {
    let userPhone = req.body

    const {
        phone
    } = userPhone

    try {

        // Validate date
        let errors: any = {}

        const isPhoneExists = await User.findOne({phone})

        if (!isPhoneExists) errors.phone = 'Phone Number does not exits';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        return res.json("hello how are you")


    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

//change password
router.put('/change-password', auth, async (req: Request, res: Response) => {

    let user = await ChangePassword(req, res);
    return res.status(201).json(user)

})

router.get('/logout', auth, (req: Request, res: Response) => {
    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
    }))

    return res.status(200).json({success: true})
})

router.post('/user-info', auth, async (req: Request, res: Response) => {
    const user = await UserInfo(req, res);
    return res.json(user)
})


//user status
router.put('/update-status/:userId', auth, async (req: any, res: Response) => {

    let userStatus = await UserStatus(req, res);

    return res.status(200).json(userStatus)
})

//update profile image
router.put('/update-profile-image/:userId', auth, async (req: any, res: Response) => {
    let userImage = await UpdateUserProfileImage(req, res);
    return res.status(200).json(userImage)
})

//update profile 
router.put('/update-profile/:userId', auth, async (req: any, res: Response) => {

    const userInfo = await UpdateProfile(req, res)
    return res.status(200).json(userInfo)

})


//Server
router.get('/server-time', auth, async (req: Request, res: Response) => {
    return res.status(200).json(new Date());
})

//Memory management
router.get('/memory-management', auth, async (req: Request, res: Response) => {

    let platform = osutils.platform()
    // console.log("Platform: " + osutils.platform());
    let number_of_cpus = osutils.cpuCount()
    // console.log("Number of CPUs: " + osutils.cpuCount());

    osutils.cpuUsage(function (v) {
        console.log("CPU Usage (%) : " + v);
        let cpu_usage_percentage = v
        return cpu_usage_percentage;
    });


    // console.log("Load Average (5m): " + osutils.loadavg(5));

    let total_memory = osutils.totalmem()
    // console.log("Total Memory: " + osutils.totalmem() + "MB");
    let free_memory = osutils.freemem()
    let total_usages_memory = total_memory - free_memory
    // console.log("Free Memory: " + osutils.freemem() + "MB");

    // console.log("Free Memory (%): " + osutils.freememPercentage());

    // console.log("System Uptime: " + osutils.sysUptime() + "ms");

    let result = {
        "platform": platform,
        "number_of_cpus": number_of_cpus,
        // "cpu_usage_percentage": cpu_usage_percentage,
        "total_memory": total_memory,
        "total_usages_memory": total_usages_memory,
        "free_memory": free_memory
    }

    return res.status(200).json(result);
})

// successful trip count


export default router
