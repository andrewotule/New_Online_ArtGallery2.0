import React, { useState } from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artworks, isLoading = false }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter categories based on available artwork data
  const categories = ['all', ...new Set(artworks.map(artwork => artwork.category).filter(Boolean))];

  const filteredArtworks = activeFilter === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeFilter);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-1 h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filters */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeFilter === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Artwork Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No artworks found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ArtworkGrid;
