"use strict";
// src/auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkJwt = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming Bearer token is used
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.auth = decoded; // Assign the decoded JWT payload to 'auth'
        next();
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.checkJwt = checkJwt;
