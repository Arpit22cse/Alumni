import React, { useState } from 'react';
import { Plus, Search, Filter, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { queries as mockQueries } from '../data/mockData';
import QueryCard from '../components/Cards/QueryCard';

const Queries: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showNewQuery, setShowNewQuery] = useState(false);
  const [newQuery, setNewQuery] = useState({
    question: '',
    tags: [] as string[]
  });

  // Get all unique tags
  const allTags = Array.from(new Set(mockQueries.flatMap(q => q.tags)));

  // Filter queries
  const filteredQueries = mockQueries.filter(query => {
    const matchesSearch = query.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || query.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('New query submitted:', newQuery);
    setShowNewQuery(false);
    setNewQuery({ question: '', tags: [] });
  };

  const handleAddTag = (tag: string) => {
    if (!newQuery.tags.includes(tag)) {
      setNewQuery(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewQuery(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Q&A Forum</h1>
          <p className="text-gray-600 mt-1">
            Connect, learn, and share knowledge with our community
          </p>
        </div>
        
        {user?.role === 'student' && (
          <button
            onClick={() => setShowNewQuery(true)}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Ask Question</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {allTags.slice(0, 6).map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* New Query Form */}
      {showNewQuery && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Ask a Question</h2>
            <button
              onClick={() => setShowNewQuery(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmitQuery} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                value={newQuery.question}
                onChange={(e) => setNewQuery(prev => ({ ...prev, question: e.target.value }))}
                placeholder="What would you like to know?"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Select relevant topics)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      newQuery.tags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
              
              {newQuery.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Selected:</span>
                  {newQuery.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center space-x-1"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewQuery(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200"
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Queries List */}
      <div className="space-y-4">
        {filteredQueries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No questions found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedTag 
                ? 'Try adjusting your search or filters'
                : 'Be the first to ask a question!'
              }
            </p>
          </div>
        ) : (
          filteredQueries.map(query => (
            <QueryCard key={query.id} query={query} />
          ))
        )}
      </div>
    </div>
  );
};

export default Queries;