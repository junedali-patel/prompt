import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../services/auth.service';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'About', path: '/#about' },
  ];

  const handleAuthClick = (type: 'login' | 'signup') => {
    navigate('/auth', { state: { initialView: type } });
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#2A2B35]/50 backdrop-blur-lg border-b border-white/10 shadow-lg' 
          : 'bg-[#2A2B35]/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Prompt<span className="text-[#10A37F]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[#ECECF1] hover:text-white transition-colors
                          ${location.pathname === item.path ? 'text-white font-medium' : 'text-[#ECECF1]/80'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-[#10A37F]"
                  />
                  <span>{user.displayName}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 py-2 bg-[#202123] rounded-lg shadow-xl 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <Link
                    to="/app"
                    className="block px-4 py-2 text-sm text-[#ECECF1] hover:bg-[#343541]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-[#ECECF1] hover:bg-[#343541]"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#ECECF1] hover:bg-[#343541]"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthClick('login')}
                  className="text-[#ECECF1] hover:text-white transition-colors"
                >
                  Sign in
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthClick('signup')}
                  className="bg-[#10A37F] hover:bg-[#0D8E6C] text-white px-4 py-2 rounded-lg
                            transition-colors"
                >
                  Sign up
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#ECECF1] hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a1b23]/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-base text-[#ECECF1] hover:text-white hover:bg-[#343541]/50
                            rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <img
                      src={user.photoURL || '/default-avatar.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-[#10A37F]"
                    />
                    <span className="text-white">{user.displayName}</span>
                  </div>
                  <Link
                    to="/app"
                    className="block px-3 py-2 text-base text-[#ECECF1] hover:text-white hover:bg-[#343541]/50
                              rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base text-[#ECECF1] 
                              hover:text-white hover:bg-[#343541]/50 rounded-md transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-[#ECECF1] hover:text-white transition-colors py-2"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-[#10A37F] hover:bg-[#0D8E6C] text-white px-4 py-2 rounded-lg
                              transition-colors text-center"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 