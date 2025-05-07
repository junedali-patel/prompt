import React, { useState, useEffect } from "react";
import { fetchPromptsByKeyword } from "../lib/queries";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

interface GeneratedPrompt {
  id: string;
  title: string;
  content: string;
  category: string;
  generatedText?: string;
  status: 'generating' | 'completed' | 'error';
}

interface PromptSearchProps {
  initialQuery?: string;
}

const PromptSearch = ({ initialQuery = '' }: PromptSearchProps) => {
  const [keyword, setKeyword] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatingStatus, setGeneratingStatus] = useState<'idle' | 'generating' | 'completed'>('idle');
  
  const { addToRecent, updateDashboardResults } = useSearch();
  const navigate = useNavigate();

  const generatePromptResponse = async (prompt: any) => {
    // Simulate API call to your AI service
    try {
      setGeneratingStatus('generating');
      
      // Replace this with your actual AI service call
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.content }),
      });

      if (!response.ok) throw new Error('Failed to generate response');

      const data = await response.json();
      return data.generatedText;
    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  };

  const handleExplore = async () => {
    if (!keyword.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      // 1. First fetch matching prompts
      const prompts = await fetchPromptsByKeyword(keyword);
      
      // 2. Generate responses for each prompt
      const promptsWithResponses = await Promise.all(
        prompts.map(async (prompt) => {
          try {
            const generatedText = await generatePromptResponse(prompt);
            return {
              ...prompt,
              generatedText,
              status: 'completed' as const,
            };
          } catch (error) {
            return {
              ...prompt,
              generatedText: 'Failed to generate response',
              status: 'error' as const,
            };
          }
        })
      );
      // 3. Update dashboard with generated results
      updateDashboardResults(promptsWithResponses.map(prompt => ({
        ...prompt,
        content: prompt.text || '', // Add content field from text
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      })));
      
      // 4. Add to recent searches
      if (promptsWithResponses.length > 0) {
        addToRecent({
          ...promptsWithResponses[0],
          content: promptsWithResponses[0].text || '', // Add content field from text
          description: '',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // 5. Navigate to dashboard with generated results
      navigate('/dashboard', {
        state: { 
          searchTerm: keyword,
          generated: true 
        } 
      });
      
      setGeneratingStatus('completed');
    } catch (err) {
      setError("Failed to generate prompts. Please try again.");
      setGeneratingStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  // Optional: Auto-search on mount if initialQuery exists
  useEffect(() => {
    if (initialQuery) {
      handleExplore();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                     text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                     text-lg transition-all pr-24"
          />
          <button
            onClick={handleExplore}
            disabled={loading || !keyword.trim()}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 
                      bg-[#10A37F] text-white rounded-lg transition-all
                      ${loading ? 'opacity-50' : 'hover:bg-[#0D8E6C]'}`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              'Explore'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {generatingStatus === 'generating' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="inline-block p-4 bg-[#10A37F]/10 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-[#10A37F]/20 border-t-[#10A37F] rounded-full animate-spin" />
              <span className="text-[#10A37F]">Generating your response...</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PromptSearch; 