import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const curatedCollections = [
  {
    name: 'Aurora Visions',
    description: 'Dreamlike compositions that blur the boundary between color and light.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    href: '/gallery?collection=aurora',
  },
  {
    name: 'Human Stories',
    description: 'Portraiture capturing the nuance of expression, gesture, and identity.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    href: '/gallery?collection=portraits',
  },
  {
    name: 'Modern Organic',
    description: 'Sculptural and mixed-media works that give form to natural rhythms.',
    imageUrl: 'https://images.unsplash.com/photo-1529429617124-aee0a7786cbb?auto=format&fit=crop&w=900&q=80',
    href: '/gallery?collection=organic',
  },
];

const trendingCategories = [
  {
    name: 'Abstract Horizons',
    blurb: 'Bold color fields with sweeping movement and painterly textures.',
    color: 'from-emerald-400 via-cyan-500 to-sky-500',
    href: '/categories/abstract',
  },
  {
    name: 'Neo Figurative',
    blurb: 'Expressive forms reimagining the human body with contemporary palettes.',
    color: 'from-purple-500 via-fuchsia-500 to-pink-500',
    href: '/categories/figurative',
  },
  {
    name: 'Minimal Resonance',
    blurb: 'Sleek compositions where negative space becomes the protagonist.',
    color: 'from-slate-500 via-gray-500 to-zinc-500',
    href: '/categories/minimalism',
  },
];

const artistSpotlights = [
  {
    name: 'Amina Doucet',
    discipline: 'Chromatic abstraction',
    statement: '“My canvases are jazz improvisations—color is the instrument.”',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'João Mendes',
    discipline: 'Sculptural biomorphism',
    statement: '“I carve silhouettes that echo fossils of future ecosystems.”',
    imageUrl: 'https://images.unsplash.com/photo-1529429617124-aee0a7786cbb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mila Kovacs',
    discipline: 'Experimental photography',
    statement: '“Light leaks are memories trying to return.”',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-7d44d6c1de15?auto=format&fit=crop&w=400&q=80',
  },
];

const Discover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-40 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        </div>
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-10 px-6 py-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-medium uppercase tracking-[0.3em] text-indigo-600 shadow-sm">
            Discover
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Find the next piece that resonates with your vision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-lg text-slate-600 sm:text-xl">
            Explore curated collections, rising artists, and immersive categories crafted by our curatorial team to spark new inspiration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/gallery"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-slate-700"
            >
              Browse All Artworks
            </Link>
            <Link
              to="/gallery?category=abstract"
              className="rounded-full border border-slate-900 px-6 py-3 text-sm font-medium uppercase tracking-wide text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Explore Abstract
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending categories */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Trending narratives</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Dive into artistic movements gathering momentum across our community. Each category is updated weekly by our curators.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            See full gallery →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trendingCategories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.color} p-[1px]`}
            >
              <div className="flex h-full flex-col justify-between rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/90 p-8 shadow-lg transition group-hover:bg-white">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">{category.blurb}</p>
                </div>
                <Link
                  to={category.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-500"
                >
                  Explore collection →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curated collections */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Curated collections</h2>
            <p className="mt-3 text-slate-600">
              Handpicked journeys designed to guide collectors through cohesive narratives, pairing artists across continents.
            </p>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {curatedCollections.map((collection) => (
              <motion.article
                key={collection.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="flex flex-col overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="h-full w-full object-cover transition duration-700 ease-out hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                </div>
                <div className="flex grow flex-col justify-between gap-6 p-8">
                  <div>
                    <h3 className="text-2xl font-semibold">{collection.name}</h3>
                    <p className="mt-4 text-sm text-slate-200">{collection.description}</p>
                  </div>
                  <Link
                    to={collection.href}
                    className="inline-flex items-center text-sm font-semibold text-indigo-200 transition hover:text-white"
                  >
                    View collection →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Artist spotlights */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Artist spotlights</h2>
          <p className="mt-3 text-slate-600">
            Engage with creators shaping contemporary dialogues. Follow them to receive studio updates and exclusive drops.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {artistSpotlights.map((artist) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-lg ring-1 ring-slate-200"
            >
              <div className="h-32 w-32 overflow-hidden rounded-full">
                <img src={artist.imageUrl} alt={artist.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{artist.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-indigo-500">{artist.discipline}</p>
                <p className="mt-4 text-sm text-slate-600">{artist.statement}</p>
              </div>
              <Link
                to={`/artists/${artist.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                View profile →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="container mx-auto flex flex-col items-center gap-8 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-3xl font-semibold sm:text-4xl"
          >
            Ready to build your collection?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl text-lg text-slate-100"
          >
            Join our curatorial sessions, receive early access to drops, and partner with advisors to shape a collection that tells your story.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-slate-200"
            >
              Become a member
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15"
            >
              Talk to a curator
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Discover;
