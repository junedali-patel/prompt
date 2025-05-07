import React from 'react';
import { useSearch } from '../context/SearchContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { dashboardResults, recentSearches } = useSearch();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Generated Results */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Generated Results</h2>
        <div className="grid gap-6">
          {dashboardResults.map((prompt) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                       hover:border-[#10A37F]/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">{prompt.title}</h3>
              <div className="mb-4">
                <p className="text-white/70 mb-2">Original Prompt:</p>
                <p className="text-white/90 bg-white/5 p-3 rounded-lg">{prompt.content}</p>
              </div>
              {prompt.generatedText && (
                <div className="mb-4">
                  <p className="text-white/70 mb-2">Generated Response:</p>
                  <p className="text-white/90 bg-[#10A37F]/10 p-3 rounded-lg">{prompt.generatedText}</p>
                </div>
              )}
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#10A37F]/10 rounded-full text-[#10A37F] text-sm">
                  {prompt.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prompt.status === 'completed' 
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {prompt.status === 'completed' ? 'Generated' : 'Failed'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Searches</h2>
        <div className="grid gap-4">
          {recentSearches.map((prompt) => (
            <motion.div
              key={prompt.id}
              className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
            >
              <h3 className="text-lg font-medium text-white">{prompt.title}</h3>
              <p className="text-white/50 text-sm mt-1">{prompt.category}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 