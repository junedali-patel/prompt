import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchPrompts, Prompt } from '../lib/searchPrompts';
import { generatePromptSuggestions } from '../lib/gemini';
import debounce from 'lodash/debounce';

const AppSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Prompt[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced function to get AI suggestions
  const debouncedGetSuggestions = debounce(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setAiSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const suggestions = await generatePromptSuggestions(query);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('AI suggestion error:', error);
    } finally {
      setLoading(false);
    }
  }, 500); // Wait 500ms after typing stops

  useEffect(() => {
    debouncedGetSuggestions(searchQuery);
    return () => debouncedGetSuggestions.cancel();
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const results = searchPrompts(searchQuery);
    setSearchResults(results);
    setShowResults(true);
    setAiSuggestions([]); // Clear suggestions when showing results
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.prompt);
    setAiSuggestions([]);
  };

  const handleClose = () => {
    setShowResults(false);
    setSearchResults([]);
    setAiSuggestions([]);
  };

  return (
    <>
      {/* Search Input */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search prompts..."
              className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                       text-lg transition-all pr-12"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/70
                       hover:text-white transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* AI Suggestions Dropdown */}
        <AnimatePresence>
          {aiSuggestions.length > 0 && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute w-full mt-2 bg-[#202123]/95 backdrop-blur-lg rounded-xl 
                        border border-white/10 shadow-xl overflow-hidden"
            >
              <div className="p-2">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 hover:bg-white/5 rounded-lg cursor-pointer
                             transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#10A37F]/20 text-[#10A37F]">
                        ✨
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white group-hover:text-[#10A37F] 
                                     transition-colors">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-white/60 line-clamp-2">
                          {suggestion.prompt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results Modal */}
      <AnimatePresence>
        {showResults && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-24 bottom-8 z-50 overflow-y-auto"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-[#1a1b23]/95 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl">
                  {/* Results Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                      Search Results ({searchResults.length})
                    </h2>
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Results List */}
                  <div className="space-y-4">
                    {searchResults.map((prompt) => (
                      <motion.div
                        key={prompt.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                                 hover:border-[#10A37F]/50 transition-all"
                      >
                        <h3 className="text-xl font-bold text-white mb-2">{prompt.title}</h3>
                        <p className="text-white/70 mb-4">{prompt.content}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-[#10A37F]/10 rounded-full text-[#10A37F] text-sm">
                            {prompt.category}
                          </span>
                          {prompt.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1 bg-white/5 rounded-full text-white/50 text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSearch; 