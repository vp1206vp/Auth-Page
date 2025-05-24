import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from '../components/auth/AnimatedBackground';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10,
        delay: 0.2 
      }
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome to Dashboard!</h1>
          <p className="mt-2 text-gray-600">
            This is a placeholder for the actual dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={logoVariants}>
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white bg-opacity-10 backdrop-blur-md p-4 mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome To Project<span className="text-indigo-400">Hub</span></h1>
          <p className="text-white text-opacity-80 mt-1">Manage your projects with ease</p>
        </motion.div>

        {/* Auth Container */}
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20"
          variants={itemVariants}
        >
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="p-1 bg-white bg-opacity-20 rounded-lg inline-flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isLogin 
                    ? 'bg-white text-indigo-800 shadow-sm' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-white text-indigo-800 shadow-sm' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm onBack={() => setIsLogin(true)} />}
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-white text-opacity-70 text-sm mt-8"
          variants={itemVariants}
        >
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthPage;