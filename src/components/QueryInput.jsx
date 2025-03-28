import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, addToHistory, setLoading, setResults } from '../store/querySlice';

const mockApiCall = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    type: 'lineChart',
    data: Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 1000)
    }))
  };
};

export default function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery, suggestions } = useSelector((state) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;

    dispatch(setLoading(true));
    dispatch(addToHistory(currentQuery));

    try {
      const results = await mockApiCall(currentQuery);
      dispatch(setResults(results));
    } catch (error) {
      console.error('Error processing query:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ask your business question..."
            className="w-full pl-12 pr-12 py-4 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-4 text-blue-600 hover:text-blue-700"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => dispatch(setCurrentQuery(suggestion))}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}