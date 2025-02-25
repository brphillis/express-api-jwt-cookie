import cookieParser from "cookie-parser";
import express, { Express } from "express";

import * as config from "./config";
import { auth } from "./routes/auth";
import { blogs } from "./routes/blogs";
import { errorHandler } from "./middleware/errorHandler";
import { authJwtCookie } from "./middleware/authJwtCookie";

export const app: Express = express();
const port = config.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use("/auth", auth);
app.use("/blogs", authJwtCookie, blogs);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
