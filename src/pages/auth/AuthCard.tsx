import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { motion, AnimatePresence } from 'framer-motion';

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent p-8">
      <div className="relative w-[600px] h-[700px] perspective-1000">
        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.div
              key="signup"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 90,
                damping: 15
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Signup onFlip={handleFlip} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 90,
                damping: 15
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Login onFlip={handleFlip} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#10A37F]/20 via-transparent to-purple-500/20 pointer-events-none -z-10" />
      
      {/* Animated background circles */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#10A37F]/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
`;

export default AuthCard; 