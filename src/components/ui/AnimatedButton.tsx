import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const AnimatedButton = ({ 
  children, 
  className = "", 
  onClick,
  type = "button"
}: AnimatedButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10A37F] to-purple-600 
                    rounded-full opacity-0 group-hover:opacity-30 blur transition duration-500" />
      <div className="relative">
        {children}
      </div>
    </motion.button>
  );
}; 