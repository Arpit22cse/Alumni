import React from 'react';
import { MapPin, Building, Github, Linkedin, Award } from 'lucide-react';
import { User } from '../../types';

interface ProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isCurrentUser = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with gradient background */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-green-500 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 p-6">
        {/* Basic Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.role === 'alumni' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role === 'alumni' ? 'Alumni' : 'Student'}
            </span>
          </div>
          
          {user.bio && (
            <p className="text-gray-600 mb-3">{user.bio}</p>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            {user.company && (
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{user.company}</span>
              </div>
            )}
            
            {user.batch && (
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Class of {user.batch}</span>
              </div>
            )}
            
            {user.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {(user.linkedin || user.github) && (
            <div className="flex space-x-3 mt-4">
              {user.linkedin && (
                <a
                  href={`https://linkedin.com/in/${user.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {user.github && (
                <a
                  href={`https://github.com/${user.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{user.points}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{user.badges.length}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Badges</h3>
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
                title={badge.description}
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium text-gray-700">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;