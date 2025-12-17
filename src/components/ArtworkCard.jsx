import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ArtworkCard = ({ artwork }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="group relative block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">{artwork.title}</h3>
              <p className="text-xs text-gray-200">{artwork.artist}</p>
            </div>
            <button
              onClick={handleLike}
              className="text-white hover:text-red-500 transition-colors"
              aria-label={isLiked ? 'Unlike artwork' : 'Like artwork'}
            >
              {isLiked ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIconOutline className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">${artwork.price}</span>
            {artwork.isLimitedEdition && (
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                Limited Edition
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-4 bg-white/90 p-3 opacity-0 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full'
        }`}
      >
        <button className="text-xs font-medium text-gray-700 hover:text-indigo-600">
          Quick View
        </button>
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ArtworkCard;
