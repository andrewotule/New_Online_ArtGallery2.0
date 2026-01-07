import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const redirectPath = location.state?.from?.pathname || '/';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    // Simulate auth success
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl blur-2xl opacity-30" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white p-10"
          >
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-indigo-200">Welcome back</p>
              <h2 className="mt-4 text-4xl font-bold leading-snug">
                Sign in to continue discovering unique artworks.
              </h2>
              <p className="mt-6 text-indigo-200">
                Access curated collections, save your favourite pieces, and manage your cart across devices.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">New here?</h3>
                <p className="text-indigo-200 mt-2">
                  Join our community of art lovers and unlock exclusive previews, collections, and personalised recommendations.
                </p>
              </div>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Create an account
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 sm:p-12"
          >
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                <p className="mt-2 text-gray-600">Enter your details to access your ArtVista account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full rounded-xl border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition ${
                        errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full rounded-xl border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition ${
                        errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      name="remember"
                      type="checkbox"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Looking to explore first?{' '}
                <Link to="/gallery" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Browse the gallery
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
