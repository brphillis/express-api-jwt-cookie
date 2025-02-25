"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const config = __importStar(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = express_1.default.Router();
// Ensure environment variables are set
const JWT_SECRET_KEY = config.JWT_SECRET;
const API_SECRET_KEY = config.API_SECRET;
if (!JWT_SECRET_KEY || !API_SECRET_KEY) {
    throw new Error("JWT_SECRET or API_SECRET is not defined in the configuration.");
}
exports.auth.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apiSecret } = req.body;
    // Validate the API secret
    if (!apiSecret) {
        return res.status(400).json({ error: "API secret is required." });
    }
    if (apiSecret !== API_SECRET_KEY) {
        return res.status(401).json({ error: "Invalid API secret." });
    }
    try {
        // Create a JWT token (add payload data if needed)
        const token = jsonwebtoken_1.default.sign({ userId: "exampleUserId" }, // Add relevant payload data here
        JWT_SECRET_KEY, { expiresIn: "1h" } // Token expires in 1 hour
        );
        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // Prevent CSRF attacks
        });
        // Return the token in the response
        res.status(200).json({ message: "Auth successful", token });
    }
    catch (error) {
        console.error("Error generating JWT token:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}));
