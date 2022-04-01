import {createConnection} from "typeorm";


const databaseProviders = async (name: string) => {

    if (name === 'postgres') {
        return createConnection(
            {
                name: 'default',
                type: 'postgres',
                port: 5432,
                synchronize: true,    // table or entity creation or update
                logging: false,       // sql log in runtime

                host: process.env.DB_HOST,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    __dirname + '/src/**/*.entity{.ts,.js}',
                ],
            }
        )
    } else if (name === 'mysql') {
        return createConnection(
            {
                name: 'default',
                type: 'mysql',
                port: 3306,
                synchronize: false,    // table or entity creation or update
                logging: false,       // sql log in runtime,

                host: process.env.DB_HOST,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    __dirname + '/src/**/*.entity{.ts,.js}',
                ],
            }
        )
    }


    // .then(() => console.log('Database connected'))
    // .catch(err => console.log(err));

}


export default databaseProviders;