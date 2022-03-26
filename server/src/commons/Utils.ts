import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import logger from "../logger";


export const FindUser = (req: Request, res: Response) => {
    console.log('auth-message', req.headers.authorization);
    // logger.log('auth-message', req.headers.authorization)

    const [type, token] = req.headers.authorization.split(' ');

    if (!token) throw new Error('Unauthenticated')

    const {phone}: any = jwt.verify(token, process.env.JWT_SECRET)

    return phone;
} 