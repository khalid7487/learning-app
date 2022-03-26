import { User } from "./User.entity";
import { getRepository, ILike } from "typeorm";


export const CountTotalDriver = async (req, res) => {

    try {
        const count = await User.count({
            relations: ['roles'],
            where: (roles) => {
                // roles.where('User__roles.name = :name', { name: 'BE_OWNER' })
                roles.where("User__roles.name IN(:...values)", { values: ['BE_OWNER'] })
            },
        })
        return count;

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}

export const AllDriver = async (req, res) => {
    let driver = req.body

    const limit = driver.limit || 10
    const page = driver.pag || 1;
    const offset = (page - 1) * limit;

    try {
        let [result, total] = await getRepository(User).findAndCount({
            relations: ['roles'],
            where: (roles) => {
                // roles.where('User__roles.name = :name', { name: 'BE_OWNER' })
                roles.where("User__roles.name IN(:...values)", { values: ['ADMIN', 'BE_OWNER'] })
            },
            order: {
                id: "DESC",
            },
            skip: offset,
            take: limit
        })

        // return alldriver
        return {
            data: result, //data
            count: total, //total table record count data
            totalPage: Math.ceil(total / limit), //total page
            limit: limit,
            page: page
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}

export const AllPublicTeachers = async (req, res) => {
    let teacher = req.body

    const {
        address,
        user_type,
        roles_code
    } = teacher

    const limit = teacher.limit || 10
    const page = teacher.pag || 1;
    const offset = (page - 1) * limit;

    let filter = null;

    // console.log(user_type)



    if (address && user_type && roles_code == "TEACHER") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`), user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER'] })
        }
    }
    else if (address && roles_code == "TEACHER") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`) })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER'] })
        }
    }
    else if (user_type && roles_code == "TEACHER") {
        filter = qb => {
            qb.where({ user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER'] })
        }
    }
    else if (roles_code == "TEACHER") {
        filter = qb => {
            qb.where("roles.code IN(:...values)", { values: ['TEACHER'] })
        }
    }


    else if (address && user_type && roles_code == "STUDENT") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`), user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['STUDENT'] })
        }
    }
    else if (address && roles_code == "STUDENT") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`) })
                .andWhere("roles.code IN(:...values)", { values: ['STUDENT'] })
        }
    }
    else if (user_type && roles_code == "STUDENT") {
        filter = qb => {
            qb.where({ user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['STUDENT'] })
        }
    }
    else if (roles_code == "STUDENT") {
        filter = qb => {
            qb.where("roles.code IN(:...values)", { values: ['STUDENT'] })
        }
    }

    else if (address && user_type && roles_code == "INSTITUTE_OWNER") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`), user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['INSTITUTE_OWNER'] })
        }
    }
    else if (address && roles_code == "INSTITUTE_OWNER") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`) })
                .andWhere("roles.code IN(:...values)", { values: ['INSTITUTE_OWNER'] })
        }
    }
    else if (user_type && roles_code == "INSTITUTE_OWNER") {
        filter = qb => {
            qb.where({ user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['INSTITUTE_OWNER'] })
        }
    }
    else if (roles_code == "INSTITUTE_OWNER") {
        filter = qb => {
            qb.where("roles.code IN(:...values)", { values: ['INSTITUTE_OWNER'] })
        }
    }
    else if (address && user_type && roles_code == "GURDIAN") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`), user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['GURDIAN'] })
        }
    }
    else if (address && roles_code == "GURDIAN") {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`) })
                .andWhere("roles.code IN(:...values)", { values: ['GURDIAN'] })
        }
    }
    else if (user_type && roles_code == "GURDIAN") {
        filter = qb => {
            qb.where({ user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['GURDIAN'] })
        }
    }
    else if (roles_code == "GURDIAN") {
        filter = qb => {
            qb.where("roles.code IN(:...values)", { values: ['GURDIAN'] })
        }
    }
    else if (address && user_type) {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`), user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER', 'STUDENT', 'INSTITUTE_OWNER', 'GURDIAN'] })
        }
    }
    else if (address) {
        filter = qb => {
            qb.where({ address: ILike(`%${address}%`) })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER', 'STUDENT', 'INSTITUTE_OWNER', 'GURDIAN'] })
        }
    }
    else if (user_type) {
        filter = qb => {
            qb.where({ user_type: user_type })
                .andWhere("roles.code IN(:...values)", { values: ['TEACHER', 'STUDENT', 'INSTITUTE_OWNER', 'GURDIAN'] })
        }
    }
    else {
        filter = qb => {
            qb.where("roles.code IN(:...values)", { values: ['TEACHER', 'STUDENT', 'INSTITUTE_OWNER', 'GURDIAN'] })
        }
    }

    // console.log(filter)

    try {
        let [result, total] = await getRepository(User).findAndCount({

            join: { alias: 'user', innerJoin: { roles: 'user.roles' } },
            relations: ['roles'],
            where: filter,
            order: {
                id: "DESC",
            },
            skip: offset,
            take: limit
        })

        // console.log(result)
        // return alldriver
        return {
            data: result, //data
            count: total, //total table record count data
            totalPage: Math.ceil(total / limit), //total page
            limit: limit,
            page: page
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }


}

export const GetUserwiseSchdule = async (req, res) => {
    let { userId } = req.params

    let allvehicle = await User.find({
        where: { id: userId },
        relations: ["schedules"]
    });
    return allvehicle
}
