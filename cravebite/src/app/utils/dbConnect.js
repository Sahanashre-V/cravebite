import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();



const a = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER,
});



export { a };
