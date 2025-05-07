import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserSearchHistory, SearchHistoryItem } from '../services/searchHistory';
import { motion } from 'framer-motion';

const History = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const history = await getUserSearchHistory(user.uid);
        setSearchHistory(history);
      }
    };
    fetchHistory();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Search History
      </motion.h2>
      <div className="space-y-6">
        {searchHistory.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#202123] rounded-lg p-6 hover:bg-[#343541]/50 
                     transition-colors border border-[#343541]/50"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-medium text-lg">{item.prompt}</h3>
              <span className="text-sm text-[#10A37F]">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </div>
            
            <div className="bg-[#343541]/30 rounded-lg p-4 mt-3">
              <p className="text-[#ECECF1] whitespace-pre-wrap">{item.aiResponse}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs px-2 py-1 rounded-full bg-[#10A37F]/20 text-[#10A37F]">
                {item.category || 'General'}
              </span>
            </div>
          </motion.div>
        ))}
        {searchHistory.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#ECECF1]/70 py-12"
          >
            <p className="text-xl">No search history found</p>
            <p className="mt-2">Your AI interactions will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;
