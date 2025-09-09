import React from 'react';
import { Download, Calendar, User, FolderOpen } from 'lucide-react';
import { Resource } from '../../types';
import { users } from '../../data/mockData';

interface ResourceCardProps {
  resource: Resource;
  onDownload?: (resourceId: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload }) => {
  const alumni = users.find(u => u.id === resource.alumniId);

  const handleDownload = () => {
    onDownload?.(resource.id);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${resource.title}.pdf`;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-1">
              {resource.category}
            </span>
            <h3 className="font-semibold text-gray-800 text-lg leading-tight">
              {resource.title}
            </h3>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group-hover:bg-blue-50 group-hover:text-blue-600"
          title="Download Resource"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {resource.description}
      </p>

      {/* Footer */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{alumni?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(resource.createdAt)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-blue-600">
            <Download className="w-4 h-4" />
            <span className="font-medium">{resource.downloadCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;