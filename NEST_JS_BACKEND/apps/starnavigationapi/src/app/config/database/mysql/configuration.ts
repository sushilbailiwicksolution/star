import { registerAs } from '@nestjs/config';


/**
 * Contains host,port,username etc to register connection 
 */
export default registerAs('mysql', () => ({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    dbname: process.env.MYSQL_DBNAME,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
    shost: process.env.SMYSQL_HOST,
    sport: process.env.SMYSQL_PORT,
    susername: process.env.SMYSQL_USERNAME,
    spassword: process.env.SMYSQL_PASSWORD,
    sdbname: process.env.SMYSQL_DBNAME,
    ssynchronize: process.env.SDB_SYNCHRONIZE,
    slogging: process.env.SDB_LOGGING
})); 