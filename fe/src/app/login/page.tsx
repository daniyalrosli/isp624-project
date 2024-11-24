'use client';

import { useState } from 'react';
import Link from 'next/link';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login request
    try {
      // Assume API call here for login
      setTimeout(() => {
        if (formData.email === 'user@insurexpert.com' && formData.password === 'password123') {
          // Successful login
          window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
          setError('Invalid email or password.');
        }
        setLoading(false);
      }, 1500);
    } catch {
      setError('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <section className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-center text-gray-900">Login to InsureXpert</h1>
        <p className="text-lg text-center text-gray-700 mt-2">Access your insurance claim data and predictions.</p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/reset-password" className="text-blue-500 text-sm">Forgot your password?</Link>
        </div>
        <div className="text-center mt-2">
          <Link href="/signup" className="text-blue-500 text-sm">Don&apos;t have an account? Sign up</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;