import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddUserPosts, DeleteUserPostsById, GetAllUserPosts, GetUserPostsById, GetUserPostsWiseUser, UpdateUserPosts, UpdateUserPostsStatus } from "./UserPosts.service";

const router = Router()

//Add 
router.post('/add', auth, async (req: any, res: Response) => {
    let course = await AddUserPosts(req, res);
    return res.status(201).json(course)
})

//Update
router.put('/update-user-posts/:postsId', auth, async (req: any, res: Response) => {
    let courseInfo = await UpdateUserPosts(req, res);
    return res.status(200).json(courseInfo)
})

//status
router.put('/update-user-posts-status/:postsId', auth, async (req: any, res: Response) => {
    let status = await UpdateUserPostsStatus(req, res)
    return res.status(200).json(status)
})

//Get all posts
router.post('/getall',  async (req: Request, res: Response) => {
    let allvehicle = await GetAllUserPosts(req, res)
    return res.status(200).json(allvehicle)
})

// get one by id
router.get('/get/:postsId', auth, async (req: any, res: Response) => {  
    let courseInfo = await GetUserPostsById(req, res);
    return res.status(200).json(courseInfo)
})

//delete id 
router.delete('/delete/:postId', auth, async (req: any, res: Response) => {
    let deleteMessage = await DeleteUserPostsById(req, res);
    return res.status(200).json({  message: deleteMessage })
})

//Teacher posts wise user 
router.get('/get-user-posts-wise-user/:postId',  async (req: Request, res: Response) => {

    let user = await GetUserPostsWiseUser(req, res)
    return res.status(200).json(user)
})



export default router
