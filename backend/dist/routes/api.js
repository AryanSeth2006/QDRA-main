"use strict";
// src/routes/api.ts
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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth"); // Import your authentication middleware
const User_1 = __importDefault(require("../models/User")); // Import your Mongoose User model
const router = express_1.default.Router();
// Example protected route that requires JWT authentication
router.post('/updatePoints', auth_1.checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth } = req;
        const { pointsToAdd } = req.body;
        // Ensure auth contains necessary data
        if (!auth || !auth.sub) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Find or create user based on auth.sub (assuming it's the user identifier)
        let user = yield User_1.default.findOne({ auth0Id: auth.sub });
        if (!user) {
            user = new User_1.default({ auth0Id: auth.sub, points: pointsToAdd });
        }
        else {
            user.points += pointsToAdd;
        }
        yield user.save();
        res.status(200).json({ updatedPoints: user.points });
    }
    catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
