import React from 'react';
import { Crown, TrendingUp, Award } from 'lucide-react';
import { User } from '../../types';
import { getBadgeForPoints } from '../../utils/badges';

interface LeaderboardCardProps {
  user: User;
  rank: number;
  pointsThisMonth?: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user, rank, pointsThisMonth = 0 }) => {
  const badge = getBadgeForPoints(user.points);
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Crown className="w-5 h-5" />;
    return <Award className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <div className={`flex items-center space-x-1 ${getRankColor(rank)}`}>
            {getRankIcon(rank)}
            <span className="text-2xl font-bold">#{rank}</span>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.company}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-xs text-gray-500">{badge.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="text-right">
          <div className="flex items-center space-x-1 text-blue-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-2xl font-bold">{user.points}</span>
          </div>
          <p className="text-xs text-gray-500">Total Points</p>
          {pointsThisMonth > 0 && (
            <p className="text-xs text-green-600 mt-1">
              +{pointsThisMonth} this month
            </p>
          )}
        </div>
      </div>

      {/* Skills Preview */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
              +{user.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;