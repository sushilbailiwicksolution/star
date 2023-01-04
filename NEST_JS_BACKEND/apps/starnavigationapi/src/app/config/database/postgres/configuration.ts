import { registerAs } from '@nestjs/config';


/**
 * All the variables are defined here for making connection
 */
export default registerAs('postgres', () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dbname: process.env.POSTGRES_DBNAME,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
})); 