// move all the db operation call here

import {validate} from "class-validator";
import {Response,} from "express";
import path from "path";
import {FindUser} from "../commons/Utils";
import {News} from "./News.entity";

export const sum = (n1, n2) => {
    return n1 + n2;
}

//get all news
export const getAllNews = async (req, res) => {
    let news = req.body

    const limit = news.limit || 10
    const page = news.page || 1;
    const offset = (page - 1) * limit;

    let [result, total] = await News.findAndCount({
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit
    });
    // return news;
    return {
        data: result, //data
        count: total, //total table record count data
        totalPage: Math.ceil(total / limit), //total page
        limit: limit,
        page: page
    }
}

export const AddNews = async (req: any, res: Response) => {
    let phone = FindUser(req, res);
    console.log(phone);

    let image_url_filename = "";

    if (req.files) {
        let {
            image_url
        } = req.files

        if (image_url) {
            image_url_filename = `${phone}/news_image${path.extname(image_url.name)}`;
            image_url.mv(`./uploads/${image_url_filename}`)
        }
    }

    const {
        title,
        description,
        video_url,
        promo_code,
        promo_expire_date,
        promo_discount_amount,
        promo_discount_type
    } = req.body

    try {
        //validate data
        let errors: any = {}

        const news = new News({
            title,
            description,
            image_url: image_url_filename,
            video_url,
            promo_code,
            promo_expire_date,
            promo_discount_amount,
            promo_discount_type
        })

        //validation
        errors = await validate(news)
        if (errors.length > 0) return res.status(400).json({errors})
        await news.save()

        console.log(news)
        return news;

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }


}

export const UpdateNews = async (req: any, res: Response) => {
    const id = req.params.newsId
    let news = req.body

    let phone = FindUser(req, res);
    console.log(phone);

    let image_url_filename = "";

    if (req.files) {
        let {
            image_url
        } = req.files

        if (image_url) {
            image_url_filename = `${phone}/news_image${path.extname(image_url.name)}`;
            image_url.mv(`./uploads/${image_url_filename}`)
        }
    }
    const {
        title,
        description,
        video_url,
        promo_code,
        promo_expire_date,
        promo_discount_amount,
        promo_discount_type
    } = news

    try {
        const newsInfo = await News.findOneOrFail({id: id})

        newsInfo.title = title || newsInfo.title
        newsInfo.description = description || newsInfo.description
        newsInfo.image_url = image_url_filename || newsInfo.image_url
        newsInfo.video_url = video_url || newsInfo.video_url
        newsInfo.promo_code = promo_code || newsInfo.promo_code
        newsInfo.promo_expire_date = promo_expire_date || newsInfo.promo_expire_date
        newsInfo.promo_discount_amount = promo_discount_amount || newsInfo.promo_discount_amount
        newsInfo.promo_discount_type = promo_discount_type || newsInfo.promo_discount_type

        await newsInfo.save()
        return newsInfo;

    } catch (err) {
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
    }
}

export const GetNewsById = async (id, res: Response) => {


    try {
        let errors: any = {}

        const newsInfo = await News.findOneOrFail({id: id})

        //validation
        errors = await validate(newsInfo)
        if (errors.length > 0) return res.status(400).json({errors})

        return newsInfo;

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export const DeleteById = async (id, res) => {
    try {
        //Valid data
        let errors: any = {}

        const isExists = await News.findOneOrFail({id: id})

        //validation
        errors = await validate(isExists)
        if (errors.length > 0) return res.status(400).json({errors})
        await isExists.remove()
        return 'News deleted successfully';

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }

}

export const GetPromo = async (req: any, res: Response) => {
    const {
        promo_code
    } = req.body
    try {
        //validate data
        let errors: any = {}

        const isExists = await News.findOne({promo_code: promo_code})

        console.log(isExists)

        if (!isExists) errors.Promo = 'Invalid promo code '
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }
        // if (errors.length > 0) return res.status(400).json({ errors })
        // await news.save()


        return isExists;

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }


}