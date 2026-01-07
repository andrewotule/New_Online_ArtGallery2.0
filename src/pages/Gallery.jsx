import React, { useState, useEffect } from 'react';
import ArtworkGrid from '../components/ArtworkGrid';
import { motion } from 'framer-motion';

// Mock data for all artworks
const allArtworks = [
  // Abstract
  {
    id: 1,
    title: 'Abstract Harmony',
    artist: 'Jane Smith',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1526481280695-3c4697b457a3?auto=format&fit=crop&w=900&q=80',
    category: 'abstract',
    isLimitedEdition: true,
    likes: 128,
    createdAt: '2023-10-15'
  },
  {
    id: 2,
    title: 'Colorful Chaos',
    artist: 'Michael Chen',
    price: 375,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    category: 'abstract',
    likes: 92,
    createdAt: '2023-11-02'
  },
  // Landscape
  {
    id: 3,
    title: 'Mountain Majesty',
    artist: 'John Doe',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    category: 'landscape',
    likes: 156,
    createdAt: '2023-09-20'
  },
  {
    id: 4,
    title: 'Serene Valley',
    artist: 'Emma Wilson',
    price: 410,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    category: 'landscape',
    isLimitedEdition: true,
    likes: 203,
    createdAt: '2023-11-15'
  },
  // Urban
  {
    id: 5,
    title: 'Urban Rhythms',
    artist: 'Alex Chen',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    category: 'urban',
    isLimitedEdition: true,
    likes: 87,
    createdAt: '2023-10-05'
  },
  {
    id: 6,
    title: 'City Lights',
    artist: 'Sarah Johnson',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1465446751832-9f11e125aaa7?auto=format&fit=crop&w=900&q=80',
    category: 'urban',
    likes: 134,
    createdAt: '2023-11-10'
  },
  // Nature
  {
    id: 7,
    title: 'Ocean Dreams',
    artist: 'Maria Garcia',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    category: 'nature',
    likes: 178,
    createdAt: '2023-09-28'
  },
  {
    id: 8,
    title: 'Forest Whispers',
    artist: 'David Kim',
    price: 390,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    category: 'nature',
    likes: 145,
    createdAt: '2023-11-05'
  }
];

const Gallery = () => {
  const [artworks, setArtworks] = useState(allArtworks);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort artworks
  useEffect(() => {
    let filtered = [...allArtworks];

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(artwork => artwork.category === category);
    }

    // Filter by price range
    filtered = filtered.filter(
      artwork => artwork.price >= priceRange[0] && artwork.price <= priceRange[1]
    );

    // Sort artworks
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        // featured (default)
        filtered.sort((a, b) => (b.isLimitedEdition ? 1 : 0) - (a.isLimitedEdition ? 1 : 0) || b.likes - a.likes);
    }

    setArtworks(filtered);
  }, [category, sortBy, priceRange]);

  const categories = ['all', ...new Set(allArtworks.map(artwork => artwork.category))];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Art Gallery
          </motion.h1>
          <motion.p 
            className="text-xl text-indigo-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover and collect unique artworks from talented artists around the world.
          </motion.p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="w-full md:w-48">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          <ArtworkGrid artworks={artworks} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;