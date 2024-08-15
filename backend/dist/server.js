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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
const User_1 = __importDefault(require("./models/User"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY); // Adjust Stripe API version as needed
// Middleware
app.use((0, cors_1.default)({ origin: 'https://qdra-main.vercel.app' })); // Use the correct CORS configuration
app.use(body_parser_1.default.json());
// Database connection
mongoose_1.default.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api', user_1.default);
app.use('/api/user', user_1.default);
// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.get('/test', (req, res) => {
    res.send('working');
});
// Stripe Checkout Session route
app.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priceId } = req.body;
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'https://your-website.com/success',
            cancel_url: 'https://your-website.com/cancel',
        });
        res.json({ url: session.url });
    }
    catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
}));
// Stripe Webhook route
app.post('/webhook', body_parser_1.default.raw({ type: 'application/json' }), (req, res) => {
    const event = req.body;
    switch (event.type) {
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            console.log(`Invoice payment succeeded: ${invoice.id}`);
            break;
        case 'customer.subscription.deleted':
            const subscription = event.data.object;
            console.log(`Subscription deleted: ${subscription.id}`);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
});
// Get Wallet Balance route
app.get('/api/getWalletBalance', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ coins: user.coins });
    }
    catch (error) {
        res.status(500).send('Server error');
    }
}));
// Update Coins route
app.post('/api/updateCoins', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { platform } = req.body;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }
        const validPlatforms = ['twitter', 'facebook', 'instagram', 'youtube'];
        if (!validPlatforms.includes(platform)) {
            return res.status(400).send('Invalid platform');
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (user.followedPlatforms[platform]) {
            return res.status(400).send(`You have already followed ${platform}.`);
        }
        user.coins += 5000;
        user.followedPlatforms[platform] = true;
        yield user.save();
        res.json({ coins: user.coins });
    }
    catch (error) {
        res.status(500).send('Server error');
    }
}));
// Save Transaction ID route
app.post('/api/save-transaction', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { transactionId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the user ID from the authenticated request
    if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
    }
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.transactions.push({ transactionId, date: new Date() });
        yield user.save();
        res.status(200).json({ message: 'Transaction ID saved successfully' });
    }
    catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ message: 'Error saving transaction ID' });
    }
}));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
