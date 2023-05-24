"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const blogs_1 = require("./routes/blogs");
const login_1 = require("./routes/login");
const authJwtCookie_1 = require("./middleware/authJwtCookie");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/login", login_1.login);
exports.app.use("/blogs", authJwtCookie_1.authJwtCookie, blogs_1.blogs);
exports.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
