import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  Trophy, 
  Users, 
  User,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('student' | 'alumni')[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Q&A Forum', href: '/queries', icon: MessageSquare },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Alumni Directory', href: '/directory', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['alumni'] },
  { name: 'Profile', href: '/profile', icon: User },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = sidebarItems.filter(item => 
    !item.roles || item.roles.includes(user?.role as 'student' | 'alumni')
  );

  return (
    <div className="w-64 bg-white shadow-lg h-full border-r border-gray-200 flex flex-col">
      {/* List items will take up available space and handle overflow */}
      <div className="p-6 space-y-2 flex-1 overflow-auto">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link // Using <a> tag to simulate Link in this single file
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Role Badge now pushed to the bottom using margin-top: auto */}
      <div className="p-6 mt-auto">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              user?.role === 'alumni' ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              {user?.role === 'alumni' ? 'Alumni' : 'Student'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {user?.company || user?.batch || 'Member'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;