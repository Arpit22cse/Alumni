import React, { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Filter } from 'lucide-react';
import { users } from '../data/mockData';
import LeaderboardCard from '../components/Cards/LeaderboardCard';
import { getBadgeForPoints } from '../utils/badges';

const Leaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');

  // Filter alumni only and sort by points
  const alumni = users
    .filter(user => user.role === 'alumni')
    .sort((a, b) => b.points - a.points);

  // Create leaderboard entries
  const leaderboardEntries = alumni.map((user, index) => ({
    user,
    rank: index + 1,
    pointsThisMonth: Math.floor(Math.random() * 50) + 10 // Mock monthly points
  }));

  // Get top 3 for podium
  const topThree = leaderboardEntries.slice(0, 3);
  const others = leaderboardEntries.slice(3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
          <p className="text-gray-600 mt-1">
            Celebrating our most active and helpful alumni mentors
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all-time">All Time</option>
            <option value="this-month">This Month</option>
            <option value="this-week">This Week</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alumni</p>
              <p className="text-2xl font-bold text-gray-900">{alumni.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Scorer</p>
              <p className="text-2xl font-bold text-gray-900">{topThree[0]?.user.points || 0}</p>
              <p className="text-sm text-green-600">points</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Points</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(alumni.reduce((sum, user) => sum + user.points, 0) / alumni.length) || 0}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gold Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {alumni.filter(user => getBadgeForPoints(user.points).name === 'Gold Champion').length}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Podium */}
      {topThree.length >= 3 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center space-x-8">
            {/* Second Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">
                  {topThree[1].user.name.charAt(0)}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-2xl">🥈</div>
                <div className="font-semibold">{topThree[1].user.name}</div>
                <div className="text-sm text-gray-600">{topThree[1].user.company}</div>
                <div className="text-lg font-bold text-gray-800">{topThree[1].user.points} pts</div>
              </div>
            </div>

            {/* First Place */}
            <div className="text-center -mt-8">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {topThree[0].user.name.charAt(0)}
                </span>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                <div className="text-3xl">🏆</div>
                <div className="font-bold text-lg">{topThree[0].user.name}</div>
                <div className="text-sm text-gray-600">{topThree[0].user.company}</div>
                <div className="text-xl font-bold text-yellow-600">{topThree[0].user.points} pts</div>
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">
                  {topThree[2].user.name.charAt(0)}
                </span>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-2xl">🥉</div>
                <div className="font-semibold">{topThree[2].user.name}</div>
                <div className="text-sm text-gray-600">{topThree[2].user.company}</div>
                <div className="text-lg font-bold text-yellow-600">{topThree[2].user.points} pts</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Full Rankings</h2>
        <div className="space-y-3">
          {leaderboardEntries.map(entry => (
            <LeaderboardCard
              key={entry.user.id}
              user={entry.user}
              rank={entry.rank}
              pointsThisMonth={entry.pointsThisMonth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;