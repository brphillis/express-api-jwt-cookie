import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const API_SECRET = process.env.API_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
