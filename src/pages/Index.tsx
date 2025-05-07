import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Lightbulb, Clock } from "lucide-react";
import { 
  PromptItem, 
  generateAdvancedSuggestions, 
  loadPromptHistory, 
  savePromptHistory, 
  copyToClipboard, 
  generatePromptId,
  categorizePrompt
} from '@/utils/promptUtils';
import { AppSidebar } from '@/components/AppSidebar';
import '../styles/animations.css';
import AppSearch from '../components/AppSearch';
import { generatePromptSuggestions } from '../lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchHistoryItem, 
  addToHistory, 
  getHistory, 
  removeHistoryItem, 
  formatTimestamp 
} from '../utils/historyUtils';
import { Link } from 'react-router-dom';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [promptHistory, setPromptHistory] = useState<PromptItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const text = "New Chat";
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    const history = loadPromptHistory();
    setPromptHistory(history);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    savePromptHistory(promptHistory);
  }, [promptHistory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load history on mount
  useEffect(() => {
    setSearchHistory(getHistory());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Generate new suggestions using our advanced generator
    const newSuggestions = generateAdvancedSuggestions(prompt);
    setSuggestions(newSuggestions);

    // Categorize the prompt based on its content
    const category = categorizePrompt(prompt);

    // Add to history
    const newPromptItem: PromptItem = {
      id: generatePromptId(),
      text: prompt,
      createdAt: new Date().toISOString(),
      suggestions: newSuggestions,
      category
    };

    setPromptHistory([newPromptItem, ...promptHistory]);
    toast({
      title: "Prompt Created",
      description: "Your prompt has been generated successfully!",
    });

    // Clear the input field
    setPrompt('');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setAiResults([]);
    
    try {
      const suggestions = await generatePromptSuggestions(prompt);
      if (suggestions && suggestions.length > 0) {
        setAiResults(suggestions);
        setShowResults(true);
        // Add to history
        const updatedHistory = addToHistory(prompt, suggestions);
        setSearchHistory(updatedHistory);
      } else {
        setError('No suggestions generated. Please try a different prompt.');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAnimatedText = (text: string) => {
    return text.split('').map((letter, index) => (
      <span
        key={index}
        className="animated-letter"
        style={{ 
          marginRight: letter === ' ' ? '0.5rem' : '0.1rem',
        }}
      >
        {letter}
      </span>
    ));
  };

  // Add this section in your JSX where you want to display the history
  const renderHistory = () => (
    <div className="card-glow rounded-xl border border-[#4E4F60]/30 bg-[#40414F]/80 backdrop-blur-md mt-8">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-[#ECECF1] flex items-center gap-2">
          <span className="p-2 rounded-lg bg-[#10A37F]/20">🕒</span>
          Search History
        </h3>
      </div>
      <div className="p-6 pt-0">
        {searchHistory.length === 0 ? (
          <p className="text-[#ECECF1]/60">No search history yet</p>
        ) : (
          <div className="space-y-4">
            {searchHistory.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group border border-[#4E4F60]/30 rounded-lg p-4 bg-[#202123]
                          hover:bg-[#2A2B32] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-[#ECECF1]">{item.query}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#ECECF1]/60">
                      {formatTimestamp(item.timestamp)}
                    </span>
                    <button
                      onClick={() => {
                        const updated = removeHistoryItem(item.id);
                        setSearchHistory(updated);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity
                               text-[#ECECF1]/60 hover:text-[#ECECF1]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {item.results.map((result, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 bg-[#343541] rounded-lg border border-[#4E4F60]/30
                               cursor-pointer hover:bg-[#40414F] transition-all duration-200"
                      onClick={() => {
                        setPrompt(result.prompt);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="font-medium text-[#10A37F] mb-1">{result.title}</div>
                      <div className="text-[#ECECF1]/90">{result.prompt}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1b23] pt-24">
      <div className="container mx-auto px-4">
        <main className="flex-1 h-screen flex flex-col bg-gradient-to-b from-[#1a1b23] to-[#343541] text-[#ECECF1] overflow-hidden">
          <div className="flex-1 w-full h-full flex flex-col overflow-auto">
            <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 flex flex-col">
              <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  <span className="animated-letter">N</span>
                  <span className="animated-letter">e</span>
                  <span className="animated-letter">w</span>
                  <span className="animated-letter"> </span>
                  <span className="animated-letter">C</span>
                  <span className="animated-letter">h</span>
                  <span className="animated-letter">a</span>
                  <span className="animated-letter">t</span>
                </h1>
                <p className="text-lg md:text-xl text-[#ECECF1]/75 max-w-2xl mx-auto">
                  Unleash your creativity with AI-powered prompt generation
                </p>
              </header>

              <AppSearch />

              <div className="card-glow rounded-xl border border-[#4E4F60]/30 bg-[#40414F]/80 backdrop-blur-md mt-8">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight text-[#ECECF1] flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[#10A37F]/20">✨</span>
                    Create a New Prompt
                  </h3>
                  <p className="text-sm text-[#ECECF1]/75">
                    Enter a topic or idea to generate unique prompt suggestions
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <form 
                    className="flex flex-col md:flex-row gap-3" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleGenerate();
                    }}
                  >
                    <input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="E.g., space exploration, cooking recipes, digital art..."
                      className="flex-1 h-12 rounded-lg bg-[#202123] border border-[#4E4F60]/30
                               px-4 py-2 text-[#ECECF1] placeholder-[#ECECF1]/50
                               focus:outline-none focus:ring-2 focus:ring-[#10A37F]
                               transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-12 px-6 bg-gradient-to-r from-[#10A37F] to-[#1A7F64] 
                               hover:from-[#1A7F64] hover:to-[#10A37F]
                               text-white rounded-lg transition-all duration-300 
                               transform hover:scale-105 hover:shadow-lg
                               flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Generate</span>
                          <span className="animate-pulse">→</span>
                        </>
                      )}
                    </button>
                  </form>
                  {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {showResults && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                      onClick={() => setShowResults(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="fixed inset-x-0 top-24 bottom-8 z-50 overflow-y-auto"
                    >
                      <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-[#1a1b23]/95 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">
                              Generated Prompts ({aiResults.length})
                            </h2>
                            <button
                              onClick={() => setShowResults(false)}
                              className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="space-y-4">
                            {aiResults.map((result, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                                         hover:border-[#10A37F]/50 transition-all"
                              >
                                <h3 className="text-lg font-semibold text-white mb-2">{result.title}</h3>
                                <p className="text-white/70 mb-4">{result.prompt}</p>
                                <div className="flex justify-between items-center">
                                  <button
                                    onClick={() => {
                                      setPrompt(result.prompt);
                                      setShowResults(false);
                                    }}
                                    className="text-sm text-[#10A37F] hover:text-[#1A7F64] transition-colors
                                             flex items-center gap-2"
                                  >
                                    Use this prompt
                                    <span className="text-lg">→</span>
                                  </button>
                                  <span className="text-xs text-white/40">Click to use</span>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {['Creative Writing', 'Technical Content', 'Visual Prompts'].map((category) => (
                  <div 
                    key={category}
                    className="group p-4 rounded-xl border border-[#4E4F60]/30 bg-[#40414F]/50 
                             backdrop-blur-sm hover:bg-[#40414F] transition-all duration-300
                             hover:scale-105 cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold mb-2">{category}</h3>
                    <p className="text-sm text-[#ECECF1]/60">
                      Generate specialized prompts for {category.toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex-1 grid gap-6">
                <div className="card-glow rounded-xl border border-[#4E4F60]/30 bg-[#40414F]/80 backdrop-blur-md">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-[#ECECF1] flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-[#10A37F]/20">🕒</span>
                      Recent Prompts
                    </h3>
                    <p className="text-sm text-[#ECECF1]/75">
                      View your recent prompts
                    </p>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="grid gap-4">
                      <div className="group border border-[#4E4F60]/30 rounded-lg p-4 bg-[#202123]
                                    hover:bg-[#2A2B32] transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium text-[#ECECF1] flex items-center gap-2">
                            <span className="text-[#10A37F]">●</span> Active
                          </div>
                          <div className="text-sm text-[#ECECF1]/60">3 min ago</div>
                        </div>
                        <div className="grid gap-2">
                          <div className="text-sm p-3 bg-[#343541] rounded-lg border border-[#4E4F60]/30
                                        cursor-pointer hover:bg-[#40414F] transition-all duration-200
                                        hover:scale-[1.02] text-[#ECECF1]/90 group-hover:border-[#10A37F]/30">
                            Write a story about space exploration in the year 3000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/history"
                className="px-4 py-2 rounded-lg bg-[#40414F]/50 hover:bg-[#40414F] 
                         transition-colors duration-200 text-[#ECECF1] flex items-center gap-2"
              >
                <span>View History</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
      {renderHistory()}
    </div>
  );
};

export default Index;
