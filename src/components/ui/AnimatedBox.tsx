import { motion } from 'framer-motion';

interface AnimatedBoxProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedBox = ({ children, delay = 0 }: AnimatedBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 20px rgba(16, 163, 127, 0.3)"
      }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10A37F] to-purple-600 
                    rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}; 