import "reflect-metadata";
import express, {Request, Response} from 'express'
import morgan from 'morgan'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./auth/Auth.controller"
import google2fa from "./auth/Google2fa.controller"
import course from "./course/Course.controller"
import schedule from "./course/Schedule.controller"
import news from "./news/News.controller";
import users from "./auth/User.controller";
import scheduleEnrol from "./enrol/ScheduleEnrol.controller";
import courseEnrol from "./enrol/CourseEnrol.controller";
import teacherPosts from "./posts/TeacherPosts.controller"
import userPosts from "./posts/UserPosts.controller"
import studentPostEnrol from "./posts-enrol/StudentPostEnrol.controller"
import teacherPostEnrol from "./posts-enrol/TeacherPostEnrol.controller"

import trim from './middleware/trim'
import databaseProviders from "../dbConnection";

const fileUpload = require('express-fileupload');

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()) //Used to parse JSON bodies
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())


// enable files upload
app.use(fileUpload({createParentPath: true}));
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
// const path = require('path')
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const routePrefix = '/api/v1';

app.get('/', async (req: Request, res: Response) => {
    return res.status(200).json({status: true, message: 'Online Tutor app api'})
})

// request timeout
app.use(function (req, res, next) {
    res.setTimeout(120000000);
    next();
});

app.use(`${routePrefix}/auth`, authRoutes)
app.use(`${routePrefix}/google2fa`, google2fa)
// app.use(`${routePrefix}/rnd`, rnd)
app.use(`${routePrefix}/users`, users)
app.use(`${routePrefix}/course`, course)
app.use(`${routePrefix}/schedule`, schedule)
app.use(`${routePrefix}/schedule-enrol`, scheduleEnrol)
app.use(`${routePrefix}/course-enrol`, courseEnrol)
app.use(`${routePrefix}/teacher-posts`, teacherPosts)
app.use(`${routePrefix}/user-posts`, userPosts)
app.use(`${routePrefix}/user-post-enrol`, studentPostEnrol)
app.use(`${routePrefix}/teacher-post-enrol`, teacherPostEnrol)
app.use(`${routePrefix}/news`, news)


// app.get('/uploads', function(req, res){
//     res.sendFile(__dirname + '/uploads');
// });


app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`)


    let defaultConnection = databaseProviders(process.env.DB_TYPE)

    defaultConnection.then(() =>
        console.log('Database connected')
    ).catch(err => console.log("Database Failed to connected", err));


})

export default app;