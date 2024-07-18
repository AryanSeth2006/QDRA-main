import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import Stripe from 'stripe';
import User from './models/User';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { authenticateToken, AuthRequest } from './middleware/authMiddleware';
import Transaction, { ITransaction } from './models/Transaction'; // Import Transaction model
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI!, {

})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
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
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
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

app.get('/api/getWalletBalance', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json({ coins: user.coins });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/updateCoins', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { platform }: { platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' } = req.body;

    if (!userId) {
      return res.status(400).send('User ID is required');
    }

    const validPlatforms: Array<'twitter' | 'facebook' | 'instagram' | 'youtube'> = ['twitter', 'facebook', 'instagram', 'youtube'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).send('Invalid platform');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.followedPlatforms[platform]) {
      return res.status(400).send(`You have already followed ${platform}.`);
    }

    user.coins += 5000;
    user.followedPlatforms[platform] = true;
    await user.save();

    res.json({ coins: user.coins });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
// API endpoint to save transaction ID


app.post('/api/save-transaction', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { transactionId } = req.body;
  const userId = req.user?.id; // Get the user ID from the authenticated request

  if (!transactionId) {
    return res.status(400).json({ message: 'Transaction ID is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.transactions.push({ transactionId, date: new Date() });
    await user.save();

    res.status(200).json({ message: 'Transaction ID saved successfully' });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ message: 'Error saving transaction ID' });
  }
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
