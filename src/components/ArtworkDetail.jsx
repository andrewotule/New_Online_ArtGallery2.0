import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeftIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Mock data - in a real app, this would come from an API
const mockArtwork = {
  id: 1,
  title: 'Abstract Harmony',
  artist: 'Jane Smith',
  artistId: 'jane-smith',
  description: 'A vibrant abstract piece that captures the essence of modern art with its bold colors and dynamic composition. Each brushstroke tells a story of creative freedom and emotional expression.',
  price: 450,
  originalPrice: 600,
  imageUrl: 'https://images.unsplash.com/photo-1526481280695-3c4697b457a3?auto=format&fit=crop&w=1200&q=80',
  category: 'abstract',
  isLimitedEdition: true,
  editionNumber: 5,
  totalInEdition: 50,
  dimensions: '24" x 36"',
  medium: 'Acrylic on canvas',
  year: '2023',
  likes: 128,
  inStock: true,
  materials: 'High-quality canvas with artist-grade acrylic paints',
  tags: ['abstract', 'modern', 'colorful', 'expressionism'],
  relatedArtworks: [
    {
      id: 2,
      title: 'Colorful Chaos',
      artist: 'Michael Chen',
      price: 375,
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      category: 'abstract'
    },
    {
      id: 3,
      title: 'Mountain Majesty',
      artist: 'John Doe',
      price: 320,
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      category: 'landscape'
    }
  ]
};

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would fetch the artwork data based on the ID
  useEffect(() => {
    const fetchArtwork = async () => {
      // Simulate API call
      setTimeout(() => {
        setArtwork(mockArtwork);
        setIsLoading(false);
      }, 800);
    };

    fetchArtwork();
  }, [id]);

  const sizes = [
    { id: 'small', name: 'Small', dimensions: '12" x 18"', price: 250 },
    { id: 'medium', name: 'Medium', dimensions: '24" x 36"', price: 450 },
    { id: 'large', name: 'Large', dimensions: '36" x 54"', price: 750 }
  ];

  const handleAddToCart = () => {
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);
    addToCart({
      id: `${artwork.id}-${selectedSize}`,
      title: artwork.title,
      artist: artwork.artist,
      price: selectedSizeObj.price,
      size: selectedSizeObj.name,
      dimensions: selectedSizeObj.dimensions,
      imageUrl: artwork.imageUrl,
      quantity
    });
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Artwork Not Found</h2>
        <p className="text-gray-600 mb-6">The artwork you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/gallery')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Gallery
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                {artwork.isLimitedEdition && (
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Limited Edition
                  </div>
                )}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label={isLiked ? 'Unlike artwork' : 'Like artwork'}
                >
                  {isLiked ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIconOutline className="h-6 w-6 text-gray-700" />
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[artwork.imageUrl, ...(artwork.relatedArtworks?.slice(0, 3).map(a => a.imageUrl) || [])].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      currentImage === idx ? 'border-indigo-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{artwork.title}</h1>
                  <p className="text-xl text-gray-600 mt-1">by {artwork.artist}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${sizes.find(s => s.id === selectedSize)?.price || artwork.price}
                  </p>
                  {artwork.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${artwork.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              {artwork.isLimitedEdition && (
                <div className="mt-4 bg-indigo-50 text-indigo-800 text-sm p-3 rounded-lg">
                  <p>Limited Edition: {artwork.editionNumber} of {artwork.totalInEdition}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(artwork.editionNumber / artwork.totalInEdition) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="text-gray-700">{artwork.description}</p>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Size</h3>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size.id)}
                      className={`border rounded-md py-3 px-4 text-sm font-medium text-center ${
                        selectedSize === size.id
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {size.name}
                      <span className="block mt-1 text-xs text-gray-500">{size.dimensions}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="mr-4 text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 bg-white border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Make an Offer
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-2">
                  <ul className="pl-4 list-disc text-sm space-y-1 text-gray-600">
                    <li>Handcrafted by {artwork.artist}</li>
                    <li>High-quality {artwork.medium.toLowerCase()}</li>
                    <li>Certificate of Authenticity included</li>
                    <li>Ready to hang with premium hanging hardware</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900">Details</h3>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Dimensions</p>
                    <p>{sizes.find(s => s.id === selectedSize)?.dimensions || artwork.dimensions}</p>
                  </div>
                  <div>
                    <p className="font-medium">Medium</p>
                    <p>{artwork.medium}</p>
                  </div>
                  <div>
                    <p className="font-medium">Materials</p>
                    <p>{artwork.materials}</p>
                  </div>
                  <div>
                    <p className="font-medium">Year</p>
                    <p>{artwork.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Artworks */}
          {artwork.relatedArtworks && artwork.relatedArtworks.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">More from {artwork.artist}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artwork.relatedArtworks.map((relatedArtwork) => (
                  <div
                    key={relatedArtwork.id}
                    onClick={() => navigate(`/artwork/${relatedArtwork.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img
                        src={relatedArtwork.imageUrl}
                        alt={relatedArtwork.title}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">
                      {relatedArtwork.title}
                    </h4>
                    <p className="text-sm text-gray-600">${relatedArtwork.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;