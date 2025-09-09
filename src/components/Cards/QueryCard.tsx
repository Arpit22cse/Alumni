import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, Clock, User } from 'lucide-react';
import { Query, Answer } from '../../types';
import { users } from '../../data/mockData';

interface QueryCardProps {
  query: Query;
  onVote?: (queryId: string, isUpvote: boolean) => void;
  onAnswerVote?: (queryId: string, answerId: string, isUpvote: boolean) => void;
}

const QueryCard: React.FC<QueryCardProps> = ({ query, onVote, onAnswerVote }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  
  const student = users.find(u => u.id === query.studentId);

  const handleVote = (isUpvote: boolean) => {
    setUserVotes(prev => ({ ...prev, [query.id]: isUpvote }));
    onVote?.(query.id, isUpvote);
  };

  const handleAnswerVote = (answerId: string, isUpvote: boolean) => {
    setUserVotes(prev => ({ ...prev, [answerId]: isUpvote }));
    onAnswerVote?.(query.id, answerId, isUpvote);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{student?.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatDate(query.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {/* Vote Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleVote(true)}
            className={`p-2 rounded-lg transition-colors ${
              userVotes[query.id] === true
                ? 'bg-green-100 text-green-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className="font-semibold text-gray-700">{query.upvotes}</span>
          <button
            onClick={() => handleVote(false)}
            className={`p-2 rounded-lg transition-colors ${
              userVotes[query.id] === false
                ? 'bg-red-100 text-red-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{query.question}</h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {query.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Answers Section */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{query.answers.length} Answer{query.answers.length !== 1 ? 's' : ''}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAnswers ? 'rotate-180' : ''}`} />
        </button>

        {showAnswers && (
          <div className="mt-4 space-y-4">
            {query.answers.map((answer) => {
              const alumni = users.find(u => u.id === answer.alumniId);
              return (
                <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{alumni?.name}</h4>
                        <p className="text-sm text-gray-600">{alumni?.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAnswerVote(answer.id, true)}
                        className={`p-1 rounded transition-colors ${
                          userVotes[answer.id] === true
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium">{answer.upvotes}</span>
                      <button
                        onClick={() => handleAnswerVote(answer.id, false)}
                        className={`p-1 rounded transition-colors ${
                          userVotes[answer.id] === false
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{answer.answer}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(answer.createdAt)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryCard;