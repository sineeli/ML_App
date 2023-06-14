import React, { useState } from 'react';
import axios from 'axios';

export const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);

        const response = await axios.post('http://127.0.0.1:8000/login', formData, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    
        // Redirect or perform other actions after successful login
        console.log('Login successful', response.data);
      } catch (error) {
        // Handle login error
        console.error('Login failed', error);
      }
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">Don't have an account? <button onClick={() => props.onFormSwitch('register')} className="text-blue-500">Sign up</button></p>
        </div>
      </div>
    </div>
  );
};