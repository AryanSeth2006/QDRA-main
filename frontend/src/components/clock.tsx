import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './clock.css';

const Clock: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [points, setPoints] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const pointsToAdd = 12;
  const coinReward = 15000;

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No JWT token found');
      }
      const response = await axios.get('http://localhost:5000/api/getWalletBalance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWalletBalance(response.data.coins);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;
    if (isActive && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(countdown);
      setIsActive(false);
      handleTimerCompletion(coinReward);
    }
    return () => clearInterval(countdown);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(3 * 60 * 60); // 3 hours
    setIsActive(true);
  };

  const handleTimerCompletion = async (coins: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No JWT token found');
      }
      const response = await axios.post('http://localhost:5000/api/updateCoins', {
        coins
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWalletBalance(response.data.coins);
      console.log('Coins updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  const handleClick = () => {
    setPoints(prev => prev + pointsToAdd);
  };

  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div className="clock ">
        <div className='bg-blue-600'>
        </div>
        <div className="flex coin_wallet absolute top-0 w-full px-3 pt-20 z-10 flex-col items-center text-white">
          <div className="flex py-auto align-top justify-center coin_system">
            <div className="mt-12 text-5xl font-bold flex items-center">
              <img src="./images/logo.png" className=''  width={60} height={44} alt="coin" />
              <span className="ml-[-10px] gap-0 text-[35px] text-yellow-500">{walletBalance}</span>
            </div>
            <div className="flex flex-col justify-end top-7 relative right-20 items-center text-center">
              <h1 className="text-sm text-yellow-400 text-center align-middle font-semibold">-QDRA Wallet</h1>
            </div>
          </div>
        </div>

        <div className="clock-container">
          <section className="countdown-container">
            <div className="hours-container">
              <div className="hours">{hours}</div>
              <div className="hours-label">hours</div>
            </div>
            <div className="minutes-container">
              <div className="minutes">{minutes}</div>
              <div className="minutes-label">minutes</div>
            </div>
            <div className="seconds-container">
              <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
              <div className="seconds-label">seconds</div>
            </div>
          </section>
          <button onClick={startTimer} className="start-button bg-yellow-500">Start</button>
          <p className=" border-white! br_p pt-px text-[#FFF455]">Complete the countdown to earn 15k coins!</p> {/* Added p tag */}

        </div>

      </div>
    </div>
  );
};

export default Clock;
