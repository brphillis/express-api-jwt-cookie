import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

import * as config from "../../config";

export const auth = express.Router();

const JWT_SECRET_KEY = config.JWT_SECRET;
const API_SECRET_KEY = config.API_SECRET;

if (!JWT_SECRET_KEY || !API_SECRET_KEY) {
  throw new Error(
    "JWT_SECRET or API_SECRET is not defined in the configuration."
  );
}

auth.post("/", async (req: Request, res: Response): Promise<any> => {
  const { apiSecret } = req.body;

  if (!apiSecret) {
    return res.status(400).json({ error: "API secret is required." });
  }

  if (apiSecret !== API_SECRET_KEY) {
    return res.status(401).json({ error: "Invalid API secret." });
  }

  try {
    const token = jwt.sign({ userId: "exampleUserId" }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Auth successful", token });
  } catch (error) {
    console.error("Error generating JWT token:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
