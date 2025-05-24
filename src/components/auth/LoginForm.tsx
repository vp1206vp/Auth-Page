import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FormField } from './FormField';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, Github, Linkedin } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 text-white rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <FormField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={18} />}
        placeholder="your@email.com"
        required
      />

      <FormField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock size={18} />}
        placeholder="Enter your password"
        required
      />

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            className="rounded-md bg-white bg-opacity-20 border-none focus:ring-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 transition duration-150 mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-indigo-300 hover:text-white transition-colors">
          Forgot password?
        </a>
      </div>

      <motion.button
        type="submit"
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin mr-2" size={18} />
        ) : null}
        {isLoading ? 'Signing In...' : 'Sign In'}
      </motion.button>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white border-opacity-20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-indigo-800 bg-opacity-0 text-white text-opacity-70">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-lg shadow-sm bg-white bg-opacity-5 text-sm font-medium text-white hover:bg-opacity-10 transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={18} className="mr-2" />
            GitHub
          </motion.button>
          <motion.button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-lg shadow-sm bg-white bg-opacity-5 text-sm font-medium text-white hover:bg-opacity-10 transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Linkedin size={18} className="mr-2" />
            LinkedIn
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default LoginForm;