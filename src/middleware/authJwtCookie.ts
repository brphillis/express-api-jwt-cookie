import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authJwtCookie = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const JWT_SecretKey = process.env.JWT_SECRET!;
  const token = req.cookies.token;

  console.log("token", token);

  try {
    const user = jwt.verify(token, JWT_SecretKey) as JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};
