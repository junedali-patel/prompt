import { useState } from 'react';
import { fetchPromptsByKeyword } from '../lib/queries';

export const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchResults = await fetchPromptsByKeyword(keyword);
      setResults(searchResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search UI */}
    </div>
  );
}; 