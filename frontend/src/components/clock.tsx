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
    <div className="clock flex flex-col items-center justify-center min-h-screen  text-white">
      <div className="relative w-full max-w-2xl p-5 mx-4 bg-black bg-opacity-50 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <div className="flex items-center">
            <img src="./images/logo.png" width={60} height={44} alt="coin" />
            <span className="ml-2 text-4xl md:text-5xl text-yellow-500">{walletBalance}</span>
          </div>
          <div className="flex flex-col items-center ml-0 md:ml-4 mt-4 md:mt-0">
            <h1 className="text-sm md:text-base text-yellow-400 font-semibold">-QDRA Wallet</h1>
          </div>
        </div>

        <div className="clock-container flex flex-col items-center text-center">
          <section className="countdown-container flex flex-col sm:flex-row justify-around w-full mb-4 gap-2 sm:gap-5">
            <div className="hours-container flex flex-col items-center justify-center bg-gray-700 border-yellow-500 border-2 rounded-full w-20 h-20 sm:w-40 sm:h-40">
              <div className="hours text-2xl sm:text-3xl">{hours}</div>
              <div className="hours-label text-sm sm:text-base">hours</div>
            </div>
            <div className="minutes-container flex flex-col items-center justify-center bg-gray-700 border-yellow-500 border-2 rounded-full w-20 h-20 sm:w-40 sm:h-40">
              <div className="minutes text-2xl sm:text-3xl">{minutes}</div>
              <div className="minutes-label text-sm sm:text-base">minutes</div>
            </div>
            <div className="seconds-container flex flex-col items-center justify-center bg-gray-700 border-yellow-500 border-2 rounded-full w-20 h-20 sm:w-40 sm:h-40">
              <div className="seconds text-2xl sm:text-3xl">{seconds < 10 ? `0${seconds}` : seconds}</div>
              <div className="seconds-label text-sm sm:text-base">seconds</div>
            </div>
          </section>
          <button onClick={startTimer} className="start-button bg-yellow-500 py-2 px-4 mt-4 text-lg rounded-lg w-full sm:w-auto">
            Start
          </button>
          <p className="mt-2 text-sm sm:text-base text-[#FFF455]">Complete the countdown to earn 15k coins!</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
