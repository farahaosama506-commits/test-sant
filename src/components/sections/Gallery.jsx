import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaExpand, 
  FaTimes,
  FaHeart,
  FaShareAlt,
  FaSearchPlus
} from 'react-icons/fa';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

// مكون منفصل لكل عنصر (مع memo) عشان نقلل الـ re-renders
const GalleryItem = React.memo(({ 
  item, 
  index, 
  onClick, 
  isFavorite, 
  toggleFavorite 
}) => {
  return (
    <motion.div
      className={`gallery-item ${item.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      onClick={() => onClick(item, index)}
    >
      <div className="gallery-image-container">
        <img 
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"  // غيّر حسب نسبة الصور الفعلية إذا ممكن
          className="gallery-image"
        />
        
        {/* Overlay */}
        <div className="gallery-overlay">
          <div className="overlay-content">
            <h3 className="image-title">{item.title}</h3>
            <p className="image-description">{item.description}</p>
            
            <div className="image-tags">
              {item.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="image-actions">
              <button 
                className="action-btn favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <FaHeart className={isFavorite ? 'favorited' : ''} />
              </button>
              <button 
                className="action-btn expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(item, index);
                }}
                aria-label="Expand image"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        </div>

        {item.featured && (
          <div className="featured-badge">
            <span>Featured</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    {
      id: 1,
      title: 'Main Dining Area',
      description: 'Spacious and elegant with breathtaking ocean views',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800',
      featured: true,
      tags: ['premium', 'view', 'luxury']
    },
    {
      id: 2,
      title: 'Terrace Seating',
      description: 'Al fresco dining under the Mediterranean sun',
      category: 'outdoor',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800',
      featured: false,
      tags: ['outdoor', 'terrace', 'sunset']
    },
    {
      id: 3,
      title: 'Private Lounge',
      description: 'Exclusive space for special occasions and events',
      category: 'private',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800',
      featured: true,
      tags: ['private', 'luxury', 'events']
    },
  ];


  const categories = useMemo(() => {
    const counts = {};
    galleryItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return [
      { id: 'all', label: 'All', count: galleryItems.length },
      { id: 'interior', label: 'Interior', count: counts.interior || 0 },
      { id: 'outdoor', label: 'Outdoor', count: counts.outdoor || 0 },
      { id: 'private', label: 'Private', count: counts.private || 0 },
      { id: 'bar', label: 'Bar', count: counts.bar || 0 },
      { id: 'garden', label: 'Garden', count: counts.garden || 0 }
    ];
  }, []);

  const filteredItems = useMemo(() => 
    activeFilter === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === activeFilter),
  [activeFilter]);

  const handleImageClick = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(filteredItems.indexOf(item)); 
    setLightboxOpen(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex, filteredItems]);

  return (
    <LazyMotion features={domAnimation}>
      <section id="gallery" className="gallery-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="highlight">Gallery</span>
            </h2>
            <p className="section-subtitle">
              Discover the beauty of Santorini Café through our curated collection
            </p>
          </div>

          {/* Filters */}
          <div className="gallery-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onClick={handleImageClick}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && selectedImage && (
              <motion.div 
                className="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxOpen(false)}
              >
                <motion.div 
                  className="lightbox-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="lightbox-close"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <FaTimes />
                  </button>

                  <div className="lightbox-image-container">
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.title}
                      className="lightbox-image"
                      loading="eager"  
                      decoding="async"
                      width="1200"
                      height="900"
                    />
                    
                    <button className="lightbox-nav prev" onClick={handlePrev}>
                      <FaArrowLeft />
                    </button>
                    <button className="lightbox-nav next" onClick={handleNext}>
                      <FaArrowRight />
                    </button>

                    <div className="lightbox-zoom">
                      <FaSearchPlus />
                    </div>
                  </div>

                  
                  <div className="lightbox-info">
                  
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Gallery;