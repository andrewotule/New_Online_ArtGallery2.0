import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ArtworkGrid from '../components/ArtworkGrid';
import { motion } from 'framer-motion';

// Mock data for featured artworks
const featuredArtworks = [
  {
    id: 1,
    title: 'Abstract Harmony',
    artist: 'Jane Smith',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1526481280695-3c4697b457a3?auto=format&fit=crop&w=900&q=80',
    category: 'abstract',
    isLimitedEdition: true
  },
  {
    id: 2,
    title: 'Mountain Majesty',
    artist: 'John Doe',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    category: 'landscape'
  },
  {
    id: 3,
    title: 'Urban Rhythms',
    artist: 'Alex Chen',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    category: 'urban',
    isLimitedEdition: true
  },
  {
    id: 4,
    title: 'Ocean Dreams',
    artist: 'Maria Garcia',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    category: 'nature'
  },
];

// 3D Artwork Component for the Hero Section
const ThreeDArtwork = () => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial 
            color="#6366f1" 
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90"></div>
        
        {/* 3D Artwork Background */}
        {isMounted && <ThreeDArtwork />}
        
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <motion.div 
            className="max-w-3xl text-white"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={item}
            >
              Discover Exceptional Art for Your Space
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-indigo-100 mb-8"
              variants={item}
            >
              Explore a curated collection of unique artworks from talented artists worldwide.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
              <Link 
                to="/gallery" 
                className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-center transition-colors duration-300"
              >
                Explore Artworks
              </Link>
              <Link 
                to="/artists" 
                className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-semibold text-center transition-colors duration-300"
              >
                Meet Artists
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            className="text-white animate-bounce"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artworks</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of stunning artworks from talented artists around the world.</p>
          </motion.div>
          
          <ArtworkGrid artworks={featuredArtworks} />
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/gallery" 
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
            >
              View All Artworks
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Artwork?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Join thousands of art lovers who have found the perfect piece to complement their space.
            </p>
            <Link 
              to="/gallery" 
              className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
