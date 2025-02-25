"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (typeof err === "string") {
        // Handle string errors
        res.status(400).json({ error: err });
    }
    else if (err instanceof SyntaxError) {
        // Handle syntax errors
        res.status(400).json({ error: "Invalid JSON" });
    }
    else if (err instanceof Error) {
        // Handle generic errors
        res.status(500).json({ error: "Internal Server Error" });
    }
    else {
        // Handle other types of errors
        res.status(500).json({ error: "Unknown Error" });
    }
};
exports.errorHandler = errorHandler;
