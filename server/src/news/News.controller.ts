import auth from "../middleware/auth";
import {Request, Response, Router} from "express";
import {AddNews, DeleteById, getAllNews, GetNewsById, GetPromo, UpdateNews} from "./News.service";

const router = Router()

//Get all news
router.post('/all', auth, async (req: Request, res: Response) => {
    // let news = await News.find();
    let news = await getAllNews(req, res);
    return res.status(200).json(news)
})

// Add news
router.post('/add', auth, async (req: any, res: Response) => {

    let news = await AddNews(req, res)

    // Return the news 
    return res.status(201).json(news)

})

//Promo 

//update news
router.put('/update/:newsId', auth, async (req: any, res: Response) => {

    let newsInfo = await UpdateNews(req, res)
    return res.status(200).json(newsInfo)
})

//get one by id
router.get('/getbyId/:newsId', auth, async (req: any, res: Response) => {
    let id = req.params.newsId

    let newsInfo = await GetNewsById(id, res)
    return res.status(200).json(newsInfo)

})

//delete by id
router.delete('/deletebyid/:newsId', auth, async (req: any, res: Response) => {
    const id = req.params.newsId

    let message = await DeleteById(id, res)

    return res.status(200).json({message: message})

})

//get promo by code
router.post('/get-promo-by-code', auth, async (req: any, res: Response) => {

    let promo = await GetPromo(req, res)

    // Return the news 
    return res.status(201).json(promo)

})

export default router