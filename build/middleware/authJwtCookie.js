"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwtCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authJwtCookie = (req, res, next) => {
    dotenv_1.default.config();
    const JWT_SecretKey = process.env.JWT_SECRET;
    const token = req.cookies.token;
    try {
        const user = jsonwebtoken_1.default.verify(token, JWT_SecretKey);
        req.user = user;
        next();
    }
    catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
};
exports.authJwtCookie = authJwtCookie;
