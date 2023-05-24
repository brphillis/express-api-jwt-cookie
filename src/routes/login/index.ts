import users from "../../mock_data/users.json";
import express, { Request, Response } from "express";
import * as config from "../../config";
import jwt from "jsonwebtoken";

export const login = express.Router();
const JWT_SecretKey = config.JWT_SECRET!;

const getUser = async (username: string): Promise<User | undefined> => {
  const foundUser = users.find((user) => user.username === username);
  return foundUser;
};

login.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (!user) {
    return res.status(403).json({
      error: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(403).json({
      error: "Incorrect password",
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign({ user: userWithoutPassword }, JWT_SecretKey, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.json({ token });
});
