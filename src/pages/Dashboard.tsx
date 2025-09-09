import React from 'react';
import { TrendingUp, Users, MessageSquare, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { queries, resources, users } from '../data/mockData';
import QueryCard from '../components/Cards/QueryCard';
import ResourceCard from '../components/Cards/ResourceCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentQueries = queries.slice(0, 2);
  const recentResources = resources.slice(0, 2);
  const totalAlumni = users.filter(u => u.role === 'alumni').length;
  const totalStudents = users.filter(u => u.role === 'student').length;

  const stats = [
    {
      name: 'Total Points',
      value: user?.points || 0,
      change: '+12%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Alumni Network',
      value: totalAlumni,
      change: '+2 new',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      name: 'Active Q&As',
      value: queries.length,
      change: '+3 today',
      icon: MessageSquare,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      name: 'Resources',
      value: resources.length,
      change: '+1 this week',
      icon: BookOpen,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg text-white p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          {user?.role === 'alumni' 
            ? "Ready to mentor the next generation?" 
            : "Ready to learn from our amazing alumni network?"
          }
        </p>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">{user?.badges.length || 0} Badges Earned</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">{user?.points || 0} Points</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Q&A */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Q&A</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentQueries.map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </div>
        </div>

        {/* Recent Resources */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Latest Resources</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {user?.role === 'student' ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Ask a Question</h3>
              <p className="text-sm text-gray-600">Get help from our alumni community</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Browse Alumni</h3>
              <p className="text-sm text-gray-600">Connect with professionals in your field</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
              <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Explore Resources</h3>
              <p className="text-sm text-gray-600">Access study materials and guides</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Alumni Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Answer Questions</h3>
              <p className="text-sm text-gray-600">Help students with your expertise</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
              <BookOpen className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Share Resources</h3>
              <p className="text-sm text-gray-600">Upload helpful materials</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
              <Award className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-800">View Impact</h3>
              <p className="text-sm text-gray-600">See your mentorship statistics</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;