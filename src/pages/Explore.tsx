import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PromptSearch from '../components/PromptSearch';
import { categories } from '@/data/categories';

const Explore = () => {
  const location = useLocation();
  const initialQuery = location.state?.initialQuery || '';

  return (
    <div className="min-h-screen bg-[#1a1b23] pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Explore AI Prompts
          </h1>
          <p className="text-white/70 text-center mb-12">
            Find the perfect prompt for your next project
          </p>

          {/* Search Component with initial query */}
          <PromptSearch initialQuery={initialQuery} />

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                         hover:border-[#10A37F]/50 transition-all cursor-pointer"
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/70">{category.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore; 