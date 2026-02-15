// src/pages/OwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaCheck, 
  FaTimes, 
  FaClock, 
  FaPhone, 
  FaUser, 
  FaChair,
  FaSync,
  FaFilter,
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const OwnerDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchReservations();
    // تحديث كل 30 ثانية
    const interval = setInterval(fetchReservations, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // تحديث الإحصائيات عند تغير الحجوزات
    const newStats = {
      total: reservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length
    };
    setStats(newStats);
  }, [reservations]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:3001/reservations');
      const data = await response.json();
      // ترتيب حسب الأحدث (الأعلى id أولاً)
      setReservations(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        // تحديث القائمة محلياً بدون إعادة تحميل
        setReservations(prev => 
          prev.map(res => 
            res.id === id ? { ...res, status } : res
          )
        );
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const deleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        const response = await fetch(`http://localhost:3001/reservations/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setReservations(prev => prev.filter(res => res.id !== id));
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  // تصفية الحجوزات
  const filteredReservations = reservations.filter(res => {
    // فلترة حسب الحالة
    if (filter !== 'all' && res.status !== filter) return false;
    
    // فلترة حسب البحث
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        res.name.toLowerCase().includes(term) ||
        res.phone.includes(term) ||
        res.tableNumber.toString().includes(term)
      );
    }
    
    // فلترة حسب التاريخ
    if (selectedDate) {
      const resDate = new Date(res.createdAt).toISOString().split('T')[0];
      return resDate === selectedDate;
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <FaCheckCircle className="status-icon confirmed" />;
      case 'pending': return <FaHourglassHalf className="status-icon pending" />;
      case 'cancelled': return <FaTimesCircle className="status-icon cancelled" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="owner-dashboard loading">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-dashboard">
      {/* Header with Stats */}
      <div className="dashboard-header">
        <h1>
          <FaChair className="header-icon" />
          Reservation Management
        </h1>
        
        <div className="stats-grid">
          <div className="stat-card total">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card confirmed">
            <span className="stat-value">{stats.confirmed}</span>
            <span className="stat-label">Confirmed</span>
          </div>
          <div className="stat-card cancelled">
            <span className="stat-value">{stats.cancelled}</span>
            <span className="stat-label">Cancelled</span>
          </div>
        </div>

        <button className="refresh-btn" onClick={fetchReservations}>
          <FaSync /> Refresh
        </button>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>

        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, phone or table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filter">
            <FaCalendarAlt />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Reservations Grid */}
      <AnimatePresence>
        {filteredReservations.length > 0 ? (
          <motion.div 
            className="reservations-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredReservations.map((res, index) => (
              <motion.div
                key={res.id}
                className={`reservation-card ${res.status}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="card-header">
                  <div className="status-wrapper">
                    {getStatusIcon(res.status)}
                    <span className={`status-badge ${res.status}`}>
                      {res.status}
                    </span>
                  </div>
                  <span className="reservation-id">
                    #{res.id.toString().slice(-6)}
                  </span>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <FaUser />
                    <span className="info-label">Name:</span>
                    <span className="info-value">{res.name}</span>
                  </div>
                  
                  <div className="info-row">
                    <FaPhone />
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{res.phone}</span>
                  </div>
                  
                  <div className="info-row">
                    <FaChair />
                    <span className="info-label">Table:</span>
                    <span className="info-value">Table {res.tableNumber} • {res.guests} guests</span>
                  </div>
                  
                  <div className="info-row">
                    <FaClock />
                    <span className="info-label">Time:</span>
                    <span className="info-value">{res.time}</span>
                  </div>
                  
                  <div className="info-row date">
                    <span className="info-label">Booked:</span>
                    <span className="info-value">{formatDate(res.createdAt)}</span>
                  </div>
                </div>

                <div className="card-footer">
                  {res.status === 'pending' && (
                    <div className="action-buttons">
                      <motion.button 
                        className="confirm-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateReservationStatus(res.id, 'confirmed')}
                      >
                        <FaCheck /> Confirm
                      </motion.button>
                      <motion.button 
                        className="cancel-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateReservationStatus(res.id, 'cancelled')}
                      >
                        <FaTimes /> Cancel
                      </motion.button>
                    </div>
                  )}
                  
                  {res.status === 'confirmed' && (
                    <div className="action-buttons">
                      <motion.button 
                        className="delete-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteReservation(res.id)}
                      >
                        <FaTimes /> Delete
                      </motion.button>
                    </div>
                  )}
                  
                  {res.status === 'cancelled' && (
                    <div className="action-buttons">
                      <motion.button 
                        className="delete-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteReservation(res.id)}
                      >
                        <FaTimes /> Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaEye className="no-results-icon" />
            <h3>No reservations found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OwnerDashboard;