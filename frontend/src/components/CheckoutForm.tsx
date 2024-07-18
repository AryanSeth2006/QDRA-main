import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm: React.FC = () => {
  const { priceId } = useParams<{ priceId: string }>();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentMethod) {
      try {
        const response = await axios.post('http://localhost:5000/create-subscription', {
          email: email,
          paymentMethodId: paymentMethod.id,
          priceId: priceId,
        });

        const subscription = response.data;
        console.log(subscription);
        alert('Plan purchased successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to purchase plan.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};

export default CheckoutForm;
