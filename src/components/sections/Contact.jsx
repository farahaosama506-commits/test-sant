// src/components/sections/Contact.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaPhone, 
  FaUsers, 
  FaClock,
  FaChair,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner
} from 'react-icons/fa';

const Contact = ({ onSubmitReservation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    time: '',
    guests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [allTables, setAllTables] = useState([]);

  // جلب جميع الطاولات عند تحميل الصفحة
  useEffect(() => {
    fetchAllTables();
  }, []);

  const fetchAllTables = async () => {
    try {
      const response = await fetch('http://localhost:3001/tables');
      const tables = await response.json();
      setAllTables(tables);
      // افتراضياً نظهر كل الطاولات كمتاحة
      setAvailableTables(tables);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  // جلب الطاولات المتاحة عند تغيير الوقت
  useEffect(() => {
    if (formData.time) {
      fetchAvailableTables(formData.time);
    } else {
      // إذا ما في وقت محدد، نظهر كل الطاولات
      setAvailableTables(allTables);
    }
  }, [formData.time, allTables]);

  const fetchAvailableTables = async (time) => {
    setLoadingTables(true);
    try {
      // جلب جميع الحجوزات في هذا الوقت
      const reservationsResponse = await fetch(`http://localhost:3001/reservations?time=${time}`);
      const reservations = await reservationsResponse.json();
      
      // جلب جميع الطاولات إذا ما كانت موجودة
      let tables = allTables;
      if (tables.length === 0) {
        const tablesResponse = await fetch('http://localhost:3001/tables');
        tables = await tablesResponse.json();
        setAllTables(tables);
      }
      
      // تحديد أرقام الطاولات المحجوزة
      const bookedTableNumbers = reservations.map(r => r.tableNumber);
      
      // تصفية الطاولات المتاحة (الغير محجوزة)
      const available = tables.filter(table => 
        !bookedTableNumbers.includes(table.number)
      );
      
      setAvailableTables(available);
    } catch (error) {
      console.error('Error fetching tables:', error);
      // إذا في مشكلة بالشبكة، نظهر كل الطاولات
      setAvailableTables(allTables);
    } finally {
      setLoadingTables(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.tableNumber) {
      newErrors.tableNumber = 'Please select a table';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (formData.guests < 1) {
      newErrors.guests = 'Must be at least 1 guest';
    } else if (formData.guests > 20) {
      newErrors.guests = 'Maximum 20 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // التحقق مرة أخرى من توفر الطاولة
      const checkReservation = await fetch(
        `http://localhost:3001/reservations?time=${formData.time}&tableNumber=${formData.tableNumber}`
      );
      const existingReservations = await checkReservation.json();

      if (existingReservations.length > 0) {
        setSubmitStatus({
          type: 'error',
          message: 'Sorry, this table is already booked for this time. Please choose another table or time.'
        });
        setIsSubmitting(false);
        // تحديث قائمة الطاولات المتاحة
        fetchAvailableTables(formData.time);
        return;
      }

      // إنشاء الحجز
      const reservationData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const response = await fetch('http://localhost:3001/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Reservation confirmed! We will contact you soon.'
        });
        
        // إرسال الإشعار للمكون الأب
        if (onSubmitReservation) {
          onSubmitReservation(reservationData);
        }
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          tableNumber: '',
          time: '',
          guests: ''
        });
        
        // تحديث قائمة الطاولات المتاحة
        fetchAvailableTables(formData.time);
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // توليد أوقات متاحة (من 10 صباحاً لـ 11 مساءً)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 23; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Make a <span className="highlight">Reservation</span>
          </h2>
          <p className="section-subtitle">
            Book your table for an unforgettable Mediterranean experience
          </p>
        </div>

        <div className="contact-container">
          {/* Reservation Form */}
          <motion.form 
            className="reservation-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <h3>Table Reservation</h3>
              <p>Fill in the details below to reserve your table</p>
            </div>

            {/* Form Fields */}
            <div className="form-grid">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone className="input-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+30 123 456 7890"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              {/* Guests Field */}
              <div className="form-group">
                <label htmlFor="guests">
                  <FaUsers className="input-icon" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className={errors.guests ? 'error' : ''}
                  min="1"
                  max="20"
                  placeholder="e.g., 4"
                />
                {errors.guests && (
                  <span className="error-message">{errors.guests}</span>
                )}
              </div>

              {/* Time Field */}
              <div className="form-group">
                <label htmlFor="time">
                  <FaClock className="input-icon" />
                  Reservation Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                >
                  <option value="">Select a time</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.time && (
                  <span className="error-message">{errors.time}</span>
                )}
              </div>

              {/* Table Selection */}
              <div className="form-group full-width">
                <label htmlFor="tableNumber">
                  <FaChair className="input-icon" />
                  Select Table
                </label>
                
                {loadingTables ? (
                  <div className="loading-tables">
                    <FaSpinner className="spinner" />
                    <span>Checking available tables...</span>
                  </div>
                ) : (
                  <div className="tables-grid">
                    {availableTables.length > 0 ? (
                      availableTables.map(table => (
                        <button
                          key={table.id}
                          type="button"
                          className={`table-option ${formData.tableNumber === table.number ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, tableNumber: table.number }))}
                        >
                          <span className="table-number">Table {table.number}</span>
                          <span className="table-capacity">👥 {table.capacity} people</span>
                          <span className="table-location">{table.location || 'Standard'}</span>
                          {formData.tableNumber === table.number && (
                            <FaCheckCircle className="selected-icon" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="no-tables">
                        <FaTimesCircle />
                        <p>No tables available for this time</p>
                        {formData.time && (
                          <button 
                            type="button"
                            className="try-different-time"
                            onClick={() => setFormData(prev => ({ ...prev, time: '' }))}
                          >
                            Try different time
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {errors.tableNumber && (
                  <span className="error-message">{errors.tableNumber}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" />
                  Processing...
                </>
              ) : (
                'Confirm Reservation'
              )}
            </motion.button>

            {/* Status Message */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  className={`status-message ${submitStatus.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {submitStatus.type === 'success' ? (
                    <FaCheckCircle />
                  ) : (
                    <FaTimesCircle />
                  )}
                  <span>{submitStatus.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Contact Info Sidebar */}
          <motion.div 
            className="contact-info-sidebar"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <h3>Opening Hours</h3>
              <ul className="hours-list">
                <li>
                  <span>Monday - Friday:</span>
                  <span>7:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span>Saturday - Sunday:</span>
                  <span>8:00 AM - 12:00 AM</span>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Contact Info</h3>
              <ul className="contact-list">
                <li>
                  <FaPhone />
                  <span>+30 22860 12345</span>
                </li>
                <li>
                  <FaUser />
                  <span>info@santorinicafe.gr</span>
                </li>
                <li>
                  <FaChair />
                  <span>8 Tables Available</span>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Reservation Policy</h3>
              <ul className="policy-list">
                <li>• Free cancellation up to 2 hours before</li>
                <li>• Maximum 20 guests per reservation</li>
                <li>• Special requests? Contact us directly</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;