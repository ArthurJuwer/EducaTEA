import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "bpu2glxfluxbveprzf7p-mysql.services.clever-cloud.com",
    port: 3306,
    username: "u1rkbfb6cxmulfr9",
    password: "Rk4Ydm8QlR6Jr6oPlhEN",
    database: "bpu2glxfluxbveprzf7p",
    entities: ["api/comentarios.ts"], // dps colocar src/models/*.ts 
    migrations: ["src/migrations/**/*.ts"],
    synchronize: true,
    logging: false,
});