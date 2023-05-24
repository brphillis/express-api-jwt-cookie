import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (typeof err === "string") {
    // Handle string errors
    res.status(400).json({ error: err });
  } else if (err instanceof SyntaxError) {
    // Handle syntax errors
    res.status(400).json({ error: "Invalid JSON" });
  } else if (err instanceof Error) {
    // Handle generic errors
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    // Handle other types of errors
    res.status(500).json({ error: "Unknown Error" });
  }
};
