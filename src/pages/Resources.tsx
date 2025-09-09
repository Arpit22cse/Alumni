import React, { useState } from 'react';
import { Search, Filter, Upload, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resources as mockResources } from '../data/mockData';
import ResourceCard from '../components/Cards/ResourceCard';

const Resources: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get all unique categories
  const categories = Array.from(new Set(mockResources.map(r => r.category)));

  // Filter resources
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resourceId: string) => {
    // In a real app, this would track downloads
    console.log('Downloaded resource:', resourceId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Resource Library</h1>
          <p className="text-gray-600 mt-1">
            Access study materials, guides, and resources shared by our alumni
          </p>
        </div>
        
        {user?.role === 'alumni' && (
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Share Resource</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{mockResources.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {categories.slice(0, 3).map((category, index) => {
          const categoryResources = mockResources.filter(r => r.category === category);
          const colors = ['green', 'purple', 'orange'];
          const color = colors[index];
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{category}</p>
                  <p className="text-2xl font-bold text-gray-900">{categoryResources.length}</p>
                </div>
                <div className={`bg-${color}-50 p-3 rounded-lg`}>
                  <Download className={`w-6 h-6 text-${color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
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
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
            <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No resources found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filters'
                : 'No resources available at the moment'
              }
            </p>
          </div>
        ) : (
          filteredResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              onDownload={handleDownload}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Resources;