import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { addSearchHistory } from '../../services/searchHistory';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && user) {
      await addSearchHistory(user.uid, searchQuery.trim());
      onSearch(searchQuery.trim());
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full max-w-3xl mx-auto">
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? '100%' : '400px' }}
          className="relative"
        >
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !searchQuery && setIsExpanded(false)}
            placeholder="Search for prompts, categories, or topics..."
            className="w-full bg-[#202123]/80 backdrop-blur-xl text-white 
                     rounded-full py-4 pl-12 pr-4 text-lg outline-none border border-[#343541]/50
                     focus:border-[#10A37F] transition-all shadow-lg"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#ECECF1]/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 w-full bg-[#202123]/95 backdrop-blur-xl
                       rounded-lg border border-[#343541]/50 shadow-xl z-50 max-h-[70vh] overflow-y-auto"
            >
              {/* Quick Categories */}
              <div className="p-4 border-b border-[#343541]/50">
                <h3 className="text-[#ECECF1]/70 text-sm font-medium mb-2">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Story Writing', 'Code Generation', 'Image Prompts', 'Business'].map((cat) => (
                    <button
                      key={cat}
                      className="px-3 py-1 rounded-full bg-[#343541]/50 text-white text-sm
                               hover:bg-[#10A37F]/20 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              <div className="p-4">
                <div className="space-y-2">
                  {/* Example results */}
                  {['Story', 'Code', 'Business', 'Art'].map((category) => (
                    <div key={category} className="p-3 hover:bg-[#343541]/50 rounded-lg cursor-pointer">
                      <h4 className="text-white font-medium">{category} Prompt</h4>
                      <p className="text-sm text-[#ECECF1]/70 truncate">
                        Write a creative prompt for {category.toLowerCase()}...
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#10A37F]">1.2k uses</span>
                        <span className="text-xs text-[#ECECF1]/50">•</span>
                        <span className="text-xs text-[#ECECF1]/50">{category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default SearchBar;