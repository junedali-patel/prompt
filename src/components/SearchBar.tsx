import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { fetchPromptsByKeyword } from '../lib/queries';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateDashboardResults } = useSearch();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      // Fetch prompts from Firebase based on search query
      const results = await fetchPromptsByKeyword(searchQuery);
      // Update the dashboard results in context
      updateDashboardResults(results.map(prompt => ({
        ...prompt,
        status: 'ready',
        content: prompt.content || '',
        generatedText: prompt.generatedText || '',
        description: prompt.description || '',
        createdAt: new Date(prompt.createdAt || new Date()),
        updatedAt: new Date(prompt.updatedAt || new Date())
      })));
      
      // Navigate to dashboard with search results
      navigate('/dashboard', {
        state: {
          searchTerm: searchQuery,
          resultCount: results.length 
        } 
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="What would you like to create?"
        className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                 text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                 text-lg transition-all pr-12"
        disabled={loading}
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SearchBar; 