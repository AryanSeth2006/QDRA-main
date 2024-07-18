import React, { useState, useEffect } from 'react';
import qr_code from '../images/qr_code.jpg';
import './Checkout.css';

const cryptoWallets = [
  {
    symbol: 'BNB',
    name: 'Bitcoin',
    address: '0x4e826FC2355269976e707fDee1e62463Aa994817',
  },
];

const CheckoutCard: React.FC = () => {
  const [tab, setTab] = useState('BTC');
  const [wallet, setWallet] = useState(cryptoWallets[0]);
  const [stats, setStats] = useState({ price: 0, cap: 0, supply: 0 });
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const selectWallet = (symbol: string) => {
    const selectedWallet = cryptoWallets.find((w) => w.symbol === symbol);
    if (selectedWallet) {
      setWallet(selectedWallet);
      fetchStats(symbol);
    }
  };

  const fetchStats = (symbol: string) => {
    fetch(`https://api.coincap.io/v2/assets/${symbol.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setStats({
          price: parseFloat(data.data.priceUsd),
          cap: parseFloat(data.data.marketCapUsd),
          supply: parseFloat(data.data.supply),
        });
      });
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  };

  const handleTransactionSubmit = async () => {
    const token = localStorage.getItem('token'); // Adjust this according to where you store your token

    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/save-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          transactionId: transactionId,
        }),
      });

      const data = await response.json();
      console.log('Transaction ID saved:', data);
    } catch (error) {
      console.error('Error saving transaction ID:', error);
    }
  };

  return (
    <div className="max-w-xl p-4 py-10 bg-white text-black mx-auto h-fit rounded-lg shadow-lg">
      <header>
        <h1 className="text-black text-4xl p-3 font-sans py-3 font-semibold">Deposit</h1>
      </header>

      <main className="p-4 bg-black bg-opacity-10 rounded-lg">
        <nav className="flex space-x-2">
          <img className="h-14 w-14 rounded-lg" src="../../public/bnb chain.jpg" alt="" />
          {cryptoWallets.map((w) => (
            <button
              key={w.symbol}
              className="flex-1 py-2 text-black rounded-xl bg-yellow-400"
              onClick={() => setTab(w.symbol)}
            >
              {w.symbol}
            </button>
          ))}
        </nav>
        <section className="mt-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-4 md:space-y-0">
            <div className="w-40 flex justify-center">
              <img src={qr_code} alt={wallet.name} className="rounded-lg" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl text-yellow-400 font-bold">Donate BNB</div>
              <div className="text-gray-600">
                Send only {wallet.name} ({wallet.symbol}) to this deposit address. Sending any other coin or token to this address may result in the loss of your donation. Thanks!
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center space-y-2 md:space-x-2 bg-white p-2 rounded-lg shadow-inner">
            <span className="font-bold text-black">Address</span>
            <input type="text" value={wallet.address} readOnly className="flex-1 w-full md:w-9 font-bold text-purple-600" />
            <button
              type="button"
              onClick={() => copyText(wallet.address)}
              className="font-bold text-black bg-white"
            >
              {copied ? '✔ Copied' : '✚ Copy'}
            </button>
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center space-y-2 md:space-x-2 bg-white p-2 rounded-lg shadow-inner">
            <span className="font-bold text-black">Transaction ID</span>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="flex-1 w-full md:w-auto font-bold text-black border border-gray-300 rounded-lg p-2"
              placeholder="Enter Transaction ID"
            />
            <button
              type="button"
              onClick={handleTransactionSubmit}
              className="font-semibold text-black bg-yellow-400 rounded-lg p-2"
            >
              Submit
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CheckoutCard;
