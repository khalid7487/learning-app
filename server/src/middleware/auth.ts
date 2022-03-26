import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

import {User} from "../auth/User.entity";

/*
export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) throw new Error('Unauthenticated')

        const { email }: any = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ email })

        if (!user) throw new Error('Unauthenticated')

        res.locals.user = user

        return next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'Unauthenticated' })
    }
}
*/

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log('debug-message', req.headers.authorization);

        const [type, token] = req.headers.authorization.split(' ');

        if (!token) throw new Error('Unauthenticated')

        const {phone}: any = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({phone})

        if (!user) throw new Error('Unauthenticated')

        res.locals.user = user

        return next()
    } catch (err) {
        console.log(err.message)
        return res.status(401).json({error: 'Unauthenticated'})
    }
}

