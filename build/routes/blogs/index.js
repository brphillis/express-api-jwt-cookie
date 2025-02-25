"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogs = void 0;
const express_1 = __importDefault(require("express"));
exports.blogs = express_1.default.Router();
exports.blogs.get("/", (req, res) => {
    res.status(200).send({
        title: "Title",
        content: "Content",
    });
});
exports.blogs.post("/:id", (req, res) => {
    const { content } = req.body;
    if (!content) {
        res.status(418).send({ message: "we need content" });
    }
    res.send({
        blog: `blog with your content: ${content}`,
    });
});
