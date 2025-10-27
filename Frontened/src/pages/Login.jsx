import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login successful!');
      // Store the token in localStorage or context
      localStorage.setItem('token', data.token);
      navigate('/'); // Redirect to home or another page
    } else {
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <form onSubmit={handleLogin} className="bg-zinc-800 p-6 rounded shadow-md w-96">
          <h2 className="text-2xl text-white mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="email">Email</label>
            <input
              className="w-full p-2 border border-zinc-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="password">Password</label>
            <input
              className="w-full p-2 border border-zinc-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
          <p className="mt-4 text-gray-300 text-center">
            If you are new, <Link to="/register" className="text-blue-500 hover:underline">sign up here</Link>.
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
