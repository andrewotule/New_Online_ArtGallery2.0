import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useSpring, animated } from '@react-spring/web';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Logo Component with Interactive Animation
const Logo3D = ({ isHovered }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      meshRef.current.rotation.y = time * 0.2;
      
      // Subtle pulse effect when hovered
      if (hovered || isHovered) {
        meshRef.current.scale.lerp(
          new THREE.Vector3(1.1, 1.1, 1.1), 
          0.1
        );
      } else {
        meshRef.current.scale.lerp(
          new THREE.Vector3(1, 1, 1), 
          0.1
        );
      }
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <mesh 
        ref={meshRef} 
        scale={0.4} 
        rotation={[0.3, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#60a5fa"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          envMapIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { items, toggleCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const navRef = useRef(null);
  const searchInputRef = useRef(null);

  const navLinks = [
    { name: 'Discover', path: '/discover', hasDropdown: false },
    {
      name: 'Artworks',
      path: '/gallery',
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Artworks', path: '/gallery' },
        { name: 'New Arrivals', path: '/gallery?sort=newest' },
        { name: 'Best Sellers', path: '/gallery?sort=popular' },
        { name: 'Limited Editions', path: '/gallery?category=limited-edition' },
      ],
    },
    {
      name: 'Artists',
      path: '/artists',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Featured Artists', path: '/artists/featured' },
        { name: 'Emerging Talents', path: '/artists/emerging' },
        { name: 'All Artists', path: '/artists/all' },
      ],
    },
    {
      name: 'Categories',
      path: '/categories',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Abstract', path: '/categories/abstract' },
        { name: 'Portraits', path: '/categories/portraits' },
        { name: 'Landscape', path: '/categories/landscape' },
        { name: 'Street Art', path: '/categories/street-art' },
      ],
    },
    { name: 'Collections', path: '/collections', hasDropdown: false },
  ];

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }),
    hover: {
      y: -2,
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, display: 'none' },
    visible: {
      opacity: 1,
      y: 0,
      display: 'block',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.2 } 
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      } 
    },
    scrolled: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
      setSearchOpen(false);
      e.target.value = '';
    }
  };

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
        initial="hidden"
        animate={scrolled ? ['visible', 'scrolled'] : 'visible'}
        variants={navVariants}
        ref={navRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10">
                  <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
                    <Logo3D isHovered={isHovered} />
                  </Canvas>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ArtVista
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path} 
                  className="relative group"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center transition-colors ${
                      location.pathname === link.path
                        ? 'text-blue-600 bg-blue-50/50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/30'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDownIcon className="ml-1 h-4 w-4 text-current" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && link.dropdownItems && (
                    <motion.div
                      className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
                      initial="hidden"
                      whileHover="visible"
                      variants={dropdownVariants}
                    >
                      <div className="p-2">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors relative"
              >
                <HeartIcon className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <Link
                to="/login"
                className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <UserIcon className="h-5 w-5" />
              </Link>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="pt-2 pb-3 space-y-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">Guest</div>
                      <div className="text-sm font-medium text-gray-500">Sign in to your account</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Account settings
                    </Link>
                  </div>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-1">
                      <Link
                        to="/login"
                        className="flex-1 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flex-1">
                      <Link
                        to="/register"
                        className="flex-1 px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: 'spring', 
                  damping: 30, 
                  stiffness: 500 
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -20, 
                scale: 0.98,
                transition: { duration: 0.2 }
              }}
              className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[70] px-4"
              ref={searchRef}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for artworks, artists, categories..."
                  className="w-full pl-12 pr-10 py-4 text-gray-800 bg-white rounded-xl shadow-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  onKeyDown={handleSearch}
                  ref={searchInputRef}
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <kbd className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md hidden sm:inline-flex">
                    Esc
                  </kbd>
                </div>
              </div>
              
              {/* Search suggestions */}
              <motion.div 
                className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 }
                }}
              >
                <div className="p-2 border-b border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1">
                    Popular Searches
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {['Abstract Art', 'Landscape Photography', 'Minimalist Paintings', 'Street Art', 'Digital Art']
                    .map((item, i) => (
                      <button
                        key={i}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(item)}`);
                          setSearchOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))
                  }
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add padding to account for fixed navbar */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;
