import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('User logged in successfully:', response.data);
      // Store the token in local storage or state
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://img.freepik.com/premium-photo/bitcoin-cryptocurrency-symbol-blockchain-technology-background-d-rendering_601748-9884.jpg')]">
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-10 border-2 border-white border-opacity-70 rounded-lg backdrop-blur-lg">
        <h1 className="text-2xl text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center border-2 border-white border-opacity-70 rounded-full px-4 py-2">
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none"
            />
            <i className="ri-mail-fill text-white"></i>
          </div>
          <div className="relative flex items-center border-2 border-white border-opacity-70 rounded-full px-4 py-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 bg-transparent text-white placeholder-white focus:outline-none"
            />
            <i className="ri-lock-2-fill text-white"></i>
          </div>
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="rememberMe" className="form-checkbox" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-medium rounded-full hover:bg-opacity-90"
          >
            Login
          </button>
          <div className="text-center text-sm text-white">
            Don't have an account? <a href="/register" className="font-medium hover:underline">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
