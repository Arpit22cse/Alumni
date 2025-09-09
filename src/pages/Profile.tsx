import React from 'react';
import { Edit2, Award, TrendingUp, MessageSquare, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/Cards/ProfileCard';
import { queries, resources } from '../data/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Get user's activities
  const userQueries = queries.filter(q => q.studentId === user.id);
  const userResources = resources.filter(r => r.alumniId === user.id);
  const userAnswers = queries.reduce((count, query) => {
    return count + query.answers.filter(answer => answer.alumniId === user.id).length;
  }, 0);

  const activities = [
    {
      name: user.role === 'student' ? 'Questions Asked' : 'Questions Answered',
      value: user.role === 'student' ? userQueries.length : userAnswers,
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Resources Shared',
      value: userResources.length,
      icon: BookOpen,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      name: 'Total Points',
      value: user.points,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      name: 'Badges Earned',
      value: user.badges.length,
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  const recentActivities = [
    {
      type: 'answer',
      description: 'Answered a question about React state management',
      time: '2 hours ago',
      points: '+10'
    },
    {
      type: 'resource',
      description: 'Shared "Complete React Interview Guide"',
      time: '1 day ago',
      points: '+25'
    },
    {
      type: 'badge',
      description: 'Earned Silver Mentor badge',
      time: '3 days ago',
      points: '+50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your profile and track your community contributions
          </p>
        </div>
        
        <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md flex items-center space-x-2">
          <Edit2 className="w-5 h-5" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard user={user} isCurrentUser={true} />
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Stats */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{activity.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{activity.value}</p>
                      </div>
                      <div className={`${activity.bg} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${activity.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                      {activity.type === 'answer' && <MessageSquare className="w-4 h-4 text-white" />}
                      {activity.type === 'resource' && <BookOpen className="w-4 h-4 text-white" />}
                      {activity.type === 'badge' && <Award className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {activity.points}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 p-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View All Activity
            </button>
          </div>

          {/* Points Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Points Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Current Level: {user.badges[0]?.name || 'Bronze Helper'}</span>
                  <span className="text-sm text-gray-500">{user.points} / 151 points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((user.points / 151) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl mb-1">🥉</div>
                  <div className="text-xs text-gray-600">Bronze</div>
                  <div className="text-xs text-gray-500">0-50 pts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🥈</div>
                  <div className="text-xs text-gray-600">Silver</div>
                  <div className="text-xs text-gray-500">51-150 pts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🥇</div>
                  <div className="text-xs text-gray-600">Gold</div>
                  <div className="text-xs text-gray-500">151+ pts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;