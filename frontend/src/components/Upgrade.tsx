import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PaKuvAI0MKbyJD7u71JRTJatC7yPo2BoCJZ1huuDaLqb0jmvq6MBnDPo7O6TPGblOXCsmuDWu0hqu58qnnlh1QJ00qprCtom2');

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handlePurchase = async (priceId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
          throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      if (session.url) {
          window.location.href = session.url;
      } else {
          throw new Error('Checkout session URL is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-[url('https://i.pinimg.com/236x/1f/35/60/1f3560b7cc4831777cc729929042d00d.jpg')] bg-cover bg-center flex flex-col items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* <div className="card p-6 bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
          <p className="text-3xl font-bold">Free<span className="text-xs">/per month</span></p>
          <p className="text-4xl font-semibold mt-4">Free Forever</p>
          <hr className="my-6" />
          <ul className="space-y-2">
            <li>At Bronze cost 10k coins gives 7500 + default value.</li>
            <li>At Silver cost 15k coins gives 12500 + value after level 1.</li>
            <li>At Gold cost 20k coins gives 18000+ value after level 2.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('free')}
            className="block w-full bg-black bg-opacity-70 rounded-xl py-3 text-white mt-4 hover:bg-opacity-100">
            Buy Now
          </button>
        </div> */}

        <div className="card p-6 bg-[#A67B5B] bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
          <p className="text-3xl font-bold">2$<span className="text-xs">/per month</span></p>
          <p className="text-lg mt-4">Save $24</p>
          <h1 className="text-4xl font-semibold text-[#A67B5B] mt-2">Bronze</h1>
          <hr className="my-6" />
          <ul className="space-y-2">
            <li>Level 1 costs 2 dollars gets 40k + default value.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('price_1PaLQeAI0MKbyJD7DUJYO5uA')}
            className="block w-full bg-[#A67B5B] bg-opacity-70 rounded-xl py-3 text-white mt-4 hover:bg-opacity-100">
            Buy Now
          </button>
        </div>

        <div className="card p-6 bg-gray-500 bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
          <p className="text-3xl font-bold">4$<span className="text-xs">/per month</span></p>
          <p className="text-lg mt-4">Save $24</p>
          <h1 className="text-4xl font-semibold text-gray-500 mt-2">Silver</h1>
          <hr className="my-6" />
          <ul className="space-y-2">
            <li>Level 2 costs 4 dollars gets 90k + default value.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('price_1PaLQeAI0MKbyJD7DUJYO5uB')}
            className="block w-full bg-gray-500 bg-opacity-70 rounded-xl py-3 text-white mt-4 hover:bg-opacity-100">
            Buy Now
          </button>
        </div>

        <div className="card p-6 bg-yellow-500 bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
          <p className="text-3xl font-bold">7$<span className="text-xs">/per month</span></p>
          <p className="text-lg mt-4">Save $24</p>
          <h1 className="text-4xl font-semibold text-yellow-500 mt-2">Gold</h1>
          <hr className="my-6" />
          <ul className="space-y-2">
            <li>Level 3 costs 7 dollars gets 150k + default value.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('price_1PaLQeAI0MKbyJD7DUJYO5uC')}
            className="block w-full bg-yellow-500 bg-opacity-70 rounded-xl py-3 text-white mt-4 hover:bg-opacity-100">
            Buy Now
          </button>
        </div>
      </div>

      <a href="https://youtu.be/RLReK22LWTo" target="_blank" className="fixed bg-red-600 px-4 py-2 md:px-8 md:py-4 right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-white font-medium transition-all hover:bg-black">
        Watch on YouTube <i className="fab fa-youtube pl-2"></i>
      </a>
    </div>
  );
};

export default Upgrade;
