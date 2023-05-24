import express, { Express } from "express";
import * as config from "./config";
import { blogs } from "./routes/blogs";
import { login } from "./routes/login";
import { authJwtCookie } from "./middleware/authJwtCookie";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

export const app: Express = express();
const port = config.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use("/login", login);
app.use("/blogs", authJwtCookie, blogs);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
