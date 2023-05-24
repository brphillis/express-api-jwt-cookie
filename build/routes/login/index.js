"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const users_json_1 = __importDefault(require("../../mock_data/users.json"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.login = express_1.default.Router();
dotenv_1.default.config();
const JWT_SecretKey = process.env.JWT_SECRET;
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = users_json_1.default.find((user) => user.username === username);
    return foundUser;
});
exports.login.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield getUser(username);
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
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    const token = jsonwebtoken_1.default.sign({ user: userWithoutPassword }, JWT_SecretKey, {
        expiresIn: "1h",
    });
    res.cookie("token", token, {
        httpOnly: true,
        // You can also configure other cookie options here
    });
    res.json({ token });
}));
