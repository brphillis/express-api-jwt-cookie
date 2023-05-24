import express, { Request, Response } from "express";

export const blogs = express.Router();

blogs.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    title: "Title",
    content: "Content",
  });
});

blogs.post("/:id", (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content) {
    res.status(418).send({ message: "we need content" });
  }

  res.send({
    blog: `blog with your content: ${content}`,
  });
});
