import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FormField } from './FormField';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, User, Mail, Lock, Check, X } from 'lucide-react';

interface SignupFormProps {
  onBack: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack }) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength criteria
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
  const passwordStrengthScore = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  ].filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (passwordStrengthScore === 0) return '';
    if (passwordStrengthScore <= 2) return 'Weak';
    if (passwordStrengthScore <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrengthScore <= 2) return 'bg-red-500';
    if (passwordStrengthScore <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrengthScore < 3) {
      setError('Password is too weak');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      await signup(fullName, email, password);
    } catch (err) {
      setError('Failed to create account');
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
      <button 
        type="button" 
        onClick={onBack}
        className="mb-4 text-white flex items-center text-sm hover:text-indigo-300 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to login
      </button>

      <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 text-white rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <FormField
        label="Full Name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        icon={<User size={18} />}
        placeholder="John Doe"
        required
      />

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
        placeholder="Create a strong password"
        required
      />

      {password && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="h-2 bg-white bg-opacity-20 rounded-full w-full mr-2">
              <div 
                className={`h-full rounded-full ${getStrengthColor()}`} 
                style={{ width: `${(passwordStrengthScore / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-white whitespace-nowrap">{getPasswordStrengthLabel()}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs text-white text-opacity-90">
            <div className="flex items-center">
              {hasMinLength ? (
                <Check size={12} className="text-green-400 mr-1" />
              ) : (
                <X size={12} className="text-red-400 mr-1" />
              )}
              At least 8 characters
            </div>
            <div className="flex items-center">
              {hasUpperCase ? (
                <Check size={12} className="text-green-400 mr-1" />
              ) : (
                <X size={12} className="text-red-400 mr-1" />
              )}
              Uppercase letter
            </div>
            <div className="flex items-center">
              {hasLowerCase ? (
                <Check size={12} className="text-green-400 mr-1" />
              ) : (
                <X size={12} className="text-red-400 mr-1" />
              )}
              Lowercase letter
            </div>
            <div className="flex items-center">
              {hasNumber ? (
                <Check size={12} className="text-green-400 mr-1" />
              ) : (
                <X size={12} className="text-red-400 mr-1" />
              )}
              Number
            </div>
            <div className="flex items-center">
              {hasSpecialChar ? (
                <Check size={12} className="text-green-400 mr-1" />
              ) : (
                <X size={12} className="text-red-400 mr-1" />
              )}
              Special character
            </div>
          </div>
        </div>
      )}

      <FormField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<Lock size={18} />}
        placeholder="Confirm your password"
        required
      />

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="rounded-md bg-white bg-opacity-20 border-none focus:ring-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 transition duration-150"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
        </div>
        <label htmlFor="terms" className="ml-2 text-sm text-white">
          I agree to the <a href="#" className="text-indigo-300 hover:text-white">Terms of Service</a> and <a href="#" className="text-indigo-300 hover:text-white">Privacy Policy</a>
        </label>
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
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </motion.button>
    </motion.form>
  );
};

export default SignupForm;