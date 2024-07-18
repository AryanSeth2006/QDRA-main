import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { url } from 'inspector';

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
    <div className="container mx-auto px-4 h-full bg-[url('https://i.pinimg.com/236x/1f/35/60/1f3560b7cc4831777cc729929042d00d.jpg')] bg-cover bg-center flex justify-center items-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-12">
        <div className="card p-6 md:p-8 lg:p-12 bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
        <h2 className="card_title text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">Lite</h2>
          <p className="pricing text-3xl md:text-4xl lg:text-6xl">
            Free
            <span className="small text-xs md:text-sm">/per month</span>
          </p>
          <p className='text-[40px] font-semibold'>Free Forever</p>
          <hr className="my-6 md:my-8" />
          <ul className="features space-y-2">
            <li>At level 1 cost 10k coins gives 7500 + default value.</li>
            <li>At level 2 cost 15k coins gives 12500 + value after level 1.</li>
            <li>At level 3 cost 20k coins gives 18000+ value after level 2.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('price_1PaLQeAI0MKbyJD7DUJYO5uA')}
            className="cta_btn block w-full text-center bg-black bg-opacity-70 rounded-xl py-3 md:py-4 text-white transition-colors hover:bg-opacity-100 mt-4 md:mt-6">
            Buy Now
          </button>
        </div>

        <div className="card p-6 md:p-8 lg:p-12 bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-lg rounded-2xl">
          <h2 className="card_title text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">Pro</h2>
          <p className="pricing text-3xl md:text-4xl lg:text-6xl">
            2$
            <span className="small text-xs md:text-sm">/per month</span>
          </p>
          <p>Save $24</p>
          <h1 className='text-white font-semi-bold text-[40px]'>Pro</h1>
          <hr className="my-6 md:my-8" />
          <ul className="features space-y-2">
            <li>Level 1
            Costs 2 dollars gets 40k + default value.</li>
            <li>Level 2
            Costs 4 dollars gets 90k + default value.</li>
            <li>Level 3
            Costs 7 dollars gets 150k + default value.</li>
          </ul>
          <button 
            onClick={() => handlePurchase('price_1PaLQeAI0MKbyJD7DUJYO5uA')}
            className="cta_btn block w-full text-center bg-black bg-opacity-70 rounded-xl py-3 md:py-4 text-white transition-colors hover:bg-opacity-100 mt-4 md:mt-6">
            Buy Now
          </button>
        </div>
      </div>
      <a href="https://youtu.be/RLReK22LWTo" target="_blank" className="link fixed bg-red-600 px-8 py-4 md:px-10 md:py-6 right-[-99px] rounded-md top-1/2 transform -translate-y-1/2 rotate-90 text-white font-medium capitalize transition-all hover:bg-black">
        Watch on YouTube <i className="fab fa-youtube pl-2"></i>
      </a>
    </div>
  );
};

export default Upgrade;
