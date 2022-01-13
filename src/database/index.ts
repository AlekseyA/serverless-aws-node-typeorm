import { ConnectionOptions, createConnection } from "typeorm";

type DbTypes = "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "sap" | "oracle" | "cordova" | "nativescript" | "react-native" | "sqljs" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";

export const dbConnect = (repositoryPath: string) => {
    
    console.log("@@@@@__dirname",repositoryPath)
    const connectOptions = {
        type: process.env.DB_TYPE as DbTypes,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            repositoryPath + "/**/*.js"
        ],
        synchronize: true,
    }
    return createConnection(<ConnectionOptions>connectOptions);
}