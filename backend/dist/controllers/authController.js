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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shortid_1 = __importDefault(require("shortid"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const { referrerId } = req.query; // Extract referrerId from query parameters
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Generate referral code
        const referralCode = shortid_1.default.generate();
        const newUser = new User_1.default({
            username,
            email,
            password: hashedPassword,
            referralCode,
        });
        yield newUser.save();
        // Handle referral logic
        if (referrerId) {
            const referrer = yield User_1.default.findById(referrerId);
            if (referrer) {
                referrer.referralSignUps += 1;
                // Reward coins based on the number of successful referrals
                let coinsToAdd = 0;
                if (referrer.referralSignUps >= 10) {
                    coinsToAdd = 100000;
                }
                else if (referrer.referralSignUps >= 5) {
                    coinsToAdd = 50000;
                }
                else if (referrer.referralSignUps >= 2) {
                    coinsToAdd = 20000;
                }
                referrer.coins += coinsToAdd;
                yield referrer.save();
            }
            else {
                console.error('Referrer not found:', referrerId);
            }
        }
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ result: newUser, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ result: existingUser, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.loginUser = loginUser;
