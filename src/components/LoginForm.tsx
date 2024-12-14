import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  
import { mockApiLogin } from './MockApi'; 

const LoginForm: React.FC = () => {
  const { login } = useAuth();  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      // Make sure mockApiLogin returns an object with message
      const response = await mockApiLogin(email, password) as { message: string };
      console.log(response.message);
      
      if (response.message === 'Login successful') {
        login();  
        navigate('/dashboard'); 
      }
    } catch (err: any) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-8 shadow-2xl rounded-xl max-w-sm w-full transform hover:scale-105 transition duration-300 ease-in-out">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-2xl font-bold">L</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 transition duration-300 ease-in-out hover:text-indigo-600">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">Please login to your account</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p> // Display error message
        )}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-teal-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
