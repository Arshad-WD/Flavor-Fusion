import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import Navbar from '../components/Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert('User registered successfully!');
      navigate('/login'); // Redirect to login page after registration
    } else {
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <form onSubmit={handleRegister} className="bg-zinc-800 p-6 rounded shadow-md w-96 font-['Neue Montreal']">
          <h2 className="text-2xl text-white mb-4">Register</h2>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="username">Username</label>
            <input
              className="w-full p-2 border border-zinc-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Register
          </button>
          <p className="mt-4 text-gray-300 text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>.
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
