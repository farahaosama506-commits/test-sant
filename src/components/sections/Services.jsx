import React, { useState, useEffect, useRef } from 'react';
// في أعلى الملف بعد useState
const combinedVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    rest: { scale: 1, rotateY: 0 }
  };
import {
  FaUtensils,
  FaCoffee,
  FaBirthdayCake,
  FaWifi,
  FaUsers,
  FaWineBottle,
  FaConciergeBell,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [animatedCounters, setAnimatedCounters] = useState({
    customers: 0,
    events: 0,
    coffee: 0,
    rating: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const services = [
    {
      id: 1,
      icon: <FaUtensils />,
      title: 'Fine Dining',
      description:
        'Experience authentic Mediterranean cuisine prepared by our expert chefs using the freshest local ingredients.',
      features: ["Chef's Special Menu", 'Wine Pairing', 'Seasonal Dishes', 'Dietary Options'],
      color: '#1e3a8a',
      stats: { value: '50+', label: 'Dishes' },
    },
    {
      id: 2,
      icon: <FaCoffee />,
      title: 'Specialty Coffee',
      description:
        'Artisanal coffee blends from around the world, expertly brewed to perfection by our trained baristas.',
      features: ['Single Origin', 'Cold Brew', 'Espresso Bar', 'Coffee Workshops'],
      color: '#0ea5e9',
      stats: { value: '20+', label: 'Coffee Types' },
    },
    {
      id: 3,
      icon: <FaBirthdayCake />,
      title: 'Events & Catering',
      description:
        'Host your special occasions with us. We offer customized menus and professional event planning services.',
      features: ['Weddings', 'Corporate Events', 'Birthdays', 'Private Parties'],
      color: '#7c3aed',
      stats: { value: '100+', label: 'Events' },
    },
    {
      id: 4,
      icon: <FaWifi />,
      title: 'Co-working Space',
      description:
        'Work in a beautiful environment with high-speed WiFi, comfortable seating, and excellent coffee.',
      features: ['High-speed WiFi', 'Meeting Rooms', 'Printing Services', 'Coffee Bar'],
      color: '#10b981',
      stats: { value: '24/7', label: 'Access' },
    },
    {
      id: 5,
      icon: <FaWineBottle />,
      title: 'Wine Tasting',
      description: 'Explore our curated selection of Mediterranean wines with guided tasting sessions.',
      features: ['Wine Pairing', 'Sommelier Service', 'Wine Club', 'Imported Selection'],
      color: '#f59e0b',
      stats: { value: '150+', label: 'Wines' },
    },
    {
      id: 6,
      icon: <FaConciergeBell />,
      title: 'VIP Service',
      description: 'Exclusive personalized service with dedicated staff for our premium guests.',
      features: ['Personal Concierge', 'Priority Booking', 'Exclusive Menu', 'Private Area'],
      color: '#ef4444',
      stats: { value: 'VIP', label: 'Only' },
    },
  ];

  const stats = [
    { id: 1, icon: <FaUsers />, value: 5000, label: 'Happy Customers', suffix: '+', key: 'customers' },
    { id: 2, icon: <FaBirthdayCake />, value: 250, label: 'Events Hosted', suffix: '+', key: 'events' },
    { id: 3, icon: <FaCoffee />, value: 10000, label: 'Cups Served', suffix: '+', key: 'coffee' },
    { id: 4, icon: <FaStar />, value: 4.9, label: 'Customer Rating', suffix: '/5', key: 'rating' },
  ];

  const features = [
    { icon: <FaCheckCircle />, text: 'Free WiFi Access' },
    { icon: <FaCheckCircle />, text: 'Outdoor Seating' },
    { icon: <FaCheckCircle />, text: 'Live Music Nights' },
    { icon: <FaCheckCircle />, text: 'Parking Available' },
    { icon: <FaCheckCircle />, text: 'Kid Friendly' },
    { icon: <FaCheckCircle />, text: 'Pet Friendly' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 14,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.04,
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Counter animation
  useEffect(() => {
    if (!isInView) return;

    const intervals = [];

    stats.forEach((stat) => {
      const target = stat.value;
      const key = stat.key;
      let current = animatedCounters[key];
      const duration = 1800;
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = (target - current) / steps;

      const interval = setInterval(() => {
        setAnimatedCounters((prev) => {
          let next = prev[key] + increment;
          if (next >= target) {
            next = target;
            clearInterval(interval);
          }
          return { ...prev, [key]: next };
        });
      }, stepTime);

      intervals.push(interval);

      // Safety clear
      setTimeout(() => clearInterval(interval), duration + 200);
    });

    return () => intervals.forEach(clearInterval);
  }, [isInView]);

  const handleServiceClick = (serviceId) => {
    setActiveService((prev) => (prev === serviceId ? null : serviceId));
  };

  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            Our <span className="highlight">Premium Services</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover the exceptional experiences we offer at Santorini Café
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon" style={{ color: services[stat.id - 1]?.color || '#0ea5e9' }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-value">
                  {animatedCounters[stat.key].toFixed(stat.key === 'rating' ? 1 : 0)}
                  {stat.suffix}
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
          <motion.div
          key={service.id}
          className={`service-card ${activeService === service.id ? 'active' : ''} ${hoveredService === service.id ? 'hovered' : ''}`}
          variants={combinedVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onMouseEnter={() => setHoveredService(service.id)}
          onMouseLeave={() => setHoveredService(null)}
          onClick={() => handleServiceClick(service.id)}
        >
              <motion.div
                className="service-icon-container"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="service-icon"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}90)`,
                    boxShadow: `0 10px 30px ${service.color}30`,
                  }}
                >
                  {service.icon}
                </div>
              </motion.div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="features-list">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="feature-tag"
                      style={{ borderColor: service.color, color: service.color }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="service-stats">
                  <span className="stat-badge" style={{ background: service.color }}>
                    {service.stats.value}
                    <span className="stat-label">{service.stats.label}</span>
                  </span>
                </div>

                <motion.button
                  className="expand-btn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ color: service.color }}
                >
                  <FaArrowRight />
                  <span>Learn More</span>
                </motion.button>
              </div>

              {activeService === service.id && (
                <motion.div
                  className="service-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="details-content">
                    <h4>What's Included:</h4>
                    <ul>
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <FaCheckCircle style={{ color: service.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="book-btn" style={{ background: service.color }}>
                      Book This Service
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="features-section"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="features-header">
            <h3>Additional Amenities</h3>
            <p>Everything you need for a perfect experience</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="feature-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.06 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3>Ready to Experience Excellence?</h3>
          <p>Book your table or inquire about our services today</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Make a Reservation
            </motion.button>
            <motion.button
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              View All Services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;