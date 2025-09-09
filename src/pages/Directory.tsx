import React, { useState } from 'react';
import { Search, Filter, MapPin, Building, Users } from 'lucide-react';
import { users } from '../data/mockData';
import ProfileCard from '../components/Cards/ProfileCard';

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  // Get all alumni
  const alumni = users.filter(user => user.role === 'alumni');

  // Get unique filter options
  const batches = Array.from(new Set(alumni.map(a => a.batch).filter(Boolean))).sort();
  const companies = Array.from(new Set(alumni.map(a => a.company).filter(Boolean))).sort();
  const skills = Array.from(new Set(alumni.flatMap(a => a.skills))).sort();

  // Filter alumni
  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (alumnus.company?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         alumnus.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBatch = !selectedBatch || alumnus.batch === selectedBatch;
    const matchesCompany = !selectedCompany || alumnus.company === selectedCompany;
    const matchesSkill = !selectedSkill || alumnus.skills.includes(selectedSkill);
    
    return matchesSearch && matchesBatch && matchesCompany && matchesSkill;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Alumni Directory</h1>
        <p className="text-gray-600 mt-1">
          Connect with {alumni.length} alumni across various industries and expertise areas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alumni</p>
              <p className="text-2xl font-bold text-gray-900">{alumni.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Companies</p>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Graduation Years</p>
              <p className="text-2xl font-bold text-gray-900">{batches.length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, company, or skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>Class of {batch}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Skills</option>
              {skills.slice(0, 10).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedBatch || selectedCompany || selectedSkill) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedBatch && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center space-x-1">
                <span>Class of {selectedBatch}</span>
                <button onClick={() => setSelectedBatch('')} className="text-blue-600 hover:text-blue-800">×</button>
              </span>
            )}
            {selectedCompany && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center space-x-1">
                <span>{selectedCompany}</span>
                <button onClick={() => setSelectedCompany('')} className="text-green-600 hover:text-green-800">×</button>
              </span>
            )}
            {selectedSkill && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center space-x-1">
                <span>{selectedSkill}</span>
                <button onClick={() => setSelectedSkill('')} className="text-purple-600 hover:text-purple-800">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAlumni.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No alumni found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedBatch || selectedCompany || selectedSkill
                ? 'Try adjusting your search or filters'
                : 'No alumni in the directory'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="col-span-full">
              <p className="text-gray-600">
                Showing {filteredAlumni.length} of {alumni.length} alumni
              </p>
            </div>
            {filteredAlumni.map(alumnus => (
              <ProfileCard key={alumnus.id} user={alumnus} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Directory;