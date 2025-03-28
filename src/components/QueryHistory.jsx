import React from 'react';
import { History } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function QueryHistory() {
  const { queryHistory } = useSelector((state) => state.query);

  if (queryHistory.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Recent Queries</h2>
      </div>
      <div className="space-y-2">
        {queryHistory.map((query, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {query}
          </div>
        ))}
      </div>
    </div>
  );
}