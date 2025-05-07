import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-[#1a1b23]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Prompt<span className="text-[#10A37F]">AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-white/70 hover:text-white transition-colors">
              Explore
            </Link>
            <Link to="/history" className="text-white/70 hover:text-white transition-colors">
              History
            </Link>
            <Link to="/learning" className="text-white/70 hover:text-white transition-colors">
              Learning
            </Link>
            <Link to="/account" className="text-white/70 hover:text-white transition-colors">
              Account
            </Link>
            <Link to="/settings" className="text-white/70 hover:text-white transition-colors">
              Settings
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-[#10A37F] text-white rounded-lg hover:bg-[#0D8E6C] transition-colors"
                >
                  Sign Up
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;