import {Request, Response, Router} from "express";
import auth from "../middleware/auth"
import { AddTeacherPost, DeletePostsById, GetAllTeacherPosts, GetTeacherPostsById, GetTeacherPostsWiseUser, UpdateTeacherPosts, UpdateTeacherPostsStatus } from "./TeacherPosts.service";

const router = Router()


//Add 
router.post('/add', auth, async (req: any, res: Response) => {
    let teacherPost = await AddTeacherPost(req, res);
    return res.status(201).json(teacherPost)

})

//Update
router.put('/update-teacher-posts/:postsId', auth, async (req: any, res: Response) => {
    let courseInfo = await UpdateTeacherPosts(req, res);
    return res.status(200).json(courseInfo)
})

//status
router.put('/update-teacher-posts-status/:postsId', auth, async (req: any, res: Response) => {
    let status = await UpdateTeacherPostsStatus(req, res)
    return res.status(200).json(status)
})

//Get all posts
router.post('/getall',  async (req: Request, res: Response) => {
    let allvehicle = await GetAllTeacherPosts(req, res)
    return res.status(200).json(allvehicle)
})

// get one by id
router.get('/get/:postsId', auth, async (req: any, res: Response) => {  
    let courseInfo = await GetTeacherPostsById(req, res);
    return res.status(200).json(courseInfo)
})

//delete id 
router.delete('/delete/:postId', auth, async (req: any, res: Response) => {
    let deleteMessage = await DeletePostsById(req, res);
    return res.status(200).json({  message: deleteMessage })
})

//Teacher posts wise user 
router.get('/get-teacher-posts-wise-user/:postId',  async (req: Request, res: Response) => {

    let user = await GetTeacherPostsWiseUser(req, res)
    return res.status(200).json(user)
})



export default router
