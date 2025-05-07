import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchPrompts, Prompt } from '../lib/searchPrompts';
import { useNavigate } from 'react-router-dom';
import { addToHistory } from '../utils/historyUtils';
import { useToast } from "@/components/ui/use-toast";

const LandingSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchPrompts(query);
      addToHistory({
        id: Date.now().toString(),
        query: query.trim(),
        timestamp: new Date().toISOString(),
        results: results,
        type: "search" // Adding the required second argument
      });
      
      toast({
        title: "Success",
        description: "Your prompt has been generated successfully.",
      });
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowResults(false);
    setQuery('');
  };

  const handleExplore = () => {
    navigate('/app');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields temporarily removed */}
      </form>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={handleClose}
            />

            {/* Results Modal */}
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
                      Search Results ({searchPrompts(query).length})
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
                    {searchPrompts(query).map((prompt) => (
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
    </div>
  );
};

export default LandingSearch; 