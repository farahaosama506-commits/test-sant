import React, { useState, useEffect } from 'react';
import { 
  FaCoffee, 
  FaSmoking, 
  FaGlassMartiniAlt, 
  FaWineGlassAlt,
  FaCookieBite,
  FaLeaf,
  FaFire,
  FaStar,
  FaCartPlus,
  FaHeart,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const menuCategories = [
    { id: 'coffee', label: 'Coffee & Tea', icon: <FaCoffee />, color: '#8B4513' },
    { id: 'argileh', label: 'Argileh (Hookah)', icon: <FaSmoking />, color: '#2E8B57' },
    { id: 'fresh', label: 'Fresh Juices', icon: <FaGlassMartiniAlt />, color: '#FF6B6B' },
    { id: 'cocktails', label: 'Cocktails', icon: <FaWineGlassAlt />, color: '#6A0DAD' },
    { id: 'cheesecake', label: 'Cheesecake', icon: <FaCookieBite />, color: '#FFD700' },
    { id: 'mint', label: 'Mint & Herbal', icon: <FaLeaf />, color: '#32CD32' },
    { id: 'hot', label: 'Hot Drinks', icon: <FaFire />, color: '#FF4500' }
  ];

  const menuItems = {
    coffee: [
      { 
        id: 1, 
        name: 'Turkish Coffee', 
        description: 'Traditional strong coffee with cardamom', 
        price: 3.5,
        ingredients: ['Arabica Beans', 'Cardamom', 'Sugar'],
        popular: true,
        new: false,
        calories: 5
      },
      { 
        id: 2, 
        name: 'Espresso', 
        description: 'Rich Italian-style espresso shot', 
        price: 2.5,
        ingredients: ['Espresso Blend'],
        popular: true,
        new: false,
        calories: 3
      },
      { 
        id: 3, 
        name: 'Cappuccino', 
        description: 'Espresso with steamed milk foam', 
        price: 4.0,
        ingredients: ['Espresso', 'Steamed Milk', 'Foam'],
        popular: true,
        new: false,
        calories: 120
      },
      { 
        id: 4, 
        name: 'Iced Caramel Macchiato', 
        description: 'Iced coffee with caramel and milk', 
        price: 5.5,
        ingredients: ['Espresso', 'Milk', 'Caramel', 'Ice'],
        popular: false,
        new: true,
        calories: 180
      },
      { 
        id: 5, 
        name: 'Matcha Latte', 
        description: 'Japanese green tea with steamed milk', 
        price: 5.0,
        ingredients: ['Matcha Powder', 'Steamed Milk', 'Honey'],
        popular: false,
        new: true,
        calories: 90
      },
      { 
        id: 6, 
        name: 'Chai Tea', 
        description: 'Spiced Indian tea with milk', 
        price: 3.5,
        ingredients: ['Black Tea', 'Spices', 'Milk', 'Honey'],
        popular: true,
        new: false,
        calories: 80
      }
    ],
    argileh: [
      { 
        id: 7, 
        name: 'Double Apple', 
        description: 'Classic apple flavored hookah', 
        price: 15.0,
        ingredients: ['Apple Tobacco', 'Mint'],
        popular: true,
        new: false,
        duration: '60 min'
      },
      { 
        id: 8, 
        name: 'Mint with Lemon', 
        description: 'Refreshing mint and lemon blend', 
        price: 16.0,
        ingredients: ['Mint Tobacco', 'Lemon'],
        popular: true,
        new: false,
        duration: '60 min'
      },
      { 
        id: 9, 
        name: 'Grape & Mint', 
        description: 'Sweet grape with fresh mint', 
        price: 16.5,
        ingredients: ['Grape Tobacco', 'Mint'],
        popular: false,
        new: true,
        duration: '60 min'
      },
      { 
        id: 10, 
        name: 'Rose & Cherry', 
        description: 'Floral rose with sweet cherry', 
        price: 17.0,
        ingredients: ['Rose Tobacco', 'Cherry'],
        popular: false,
        new: true,
        duration: '60 min'
      },
      { 
        id: 11, 
        name: 'Premium Mix', 
        description: 'Special house mix of flavors', 
        price: 20.0,
        ingredients: ['Premium Tobacco', 'Secret Mix'],
        popular: true,
        new: false,
        duration: '90 min'
      }
    ],
    fresh: [
      { 
        id: 12, 
        name: 'Orange Juice', 
        description: 'Freshly squeezed oranges', 
        price: 4.5,
        ingredients: ['Fresh Oranges'],
        popular: true,
        new: false,
        calories: 110
      },
      { 
        id: 13, 
        name: 'Carrot & Apple', 
        description: 'Healthy carrot and apple blend', 
        price: 5.0,
        ingredients: ['Carrots', 'Apples', 'Ginger'],
        popular: false,
        new: true,
        calories: 95
      },
      { 
        id: 14, 
        name: 'Strawberry Smoothie', 
        description: 'Creamy strawberry smoothie', 
        price: 6.0,
        ingredients: ['Strawberries', 'Yogurt', 'Honey'],
        popular: true,
        new: false,
        calories: 150
      },
      { 
        id: 15, 
        name: 'Green Detox', 
        description: 'Spinach, kale, and green apple', 
        price: 6.5,
        ingredients: ['Spinach', 'Kale', 'Green Apple', 'Lemon'],
        popular: false,
        new: true,
        calories: 70
      },
      { 
        id: 16, 
        name: 'Tropical Mix', 
        description: 'Pineapple, mango, and passion fruit', 
        price: 7.0,
        ingredients: ['Pineapple', 'Mango', 'Passion Fruit'],
        popular: true,
        new: false,
        calories: 130
      }
    ],
    cocktails: [
      { 
        id: 17, 
        name: 'Mojito', 
        description: 'Classic Cuban cocktail', 
        price: 12.0,
        ingredients: ['White Rum', 'Mint', 'Lime', 'Soda'],
        popular: true,
        new: false,
        alcoholic: true
      },
      { 
        id: 18, 
        name: 'Pina Colada', 
        description: 'Tropical coconut and pineapple', 
        price: 13.0,
        ingredients: ['Rum', 'Coconut Cream', 'Pineapple'],
        popular: true,
        new: false,
        alcoholic: true
      },
      { 
        id: 19, 
        name: 'Virgin Mojito', 
        description: 'Minty fresh without alcohol', 
        price: 8.0,
        ingredients: ['Mint', 'Lime', 'Soda', 'Sugar'],
        popular: false,
        new: true,
        alcoholic: false
      },
      { 
        id: 20, 
        name: 'Berry Blast', 
        description: 'Mixed berries with lemonade', 
        price: 9.0,
        ingredients: ['Mixed Berries', 'Lemonade', 'Mint'],
        popular: true,
        new: false,
        alcoholic: false
      }
    ],
    cheesecake: [
      { 
        id: 21, 
        name: 'New York Cheesecake', 
        description: 'Classic creamy cheesecake', 
        price: 7.5,
        ingredients: ['Cream Cheese', 'Graham Cracker', 'Sour Cream'],
        popular: true,
        new: false,
        calories: 350
      },
      { 
        id: 22, 
        name: 'Strawberry Cheesecake', 
        description: 'Cheesecake with strawberry topping', 
        price: 8.0,
        ingredients: ['Cream Cheese', 'Strawberries', 'Graham Cracker'],
        popular: true,
        new: false,
        calories: 380
      },
      { 
        id: 23, 
        name: 'Oreo Cheesecake', 
        description: 'Cheesecake with Oreo cookies', 
        price: 8.5,
        ingredients: ['Cream Cheese', 'Oreo Cookies', 'Chocolate'],
        popular: false,
        new: true,
        calories: 420
      },
      { 
        id: 24, 
        name: 'Matcha Cheesecake', 
        description: 'Green tea flavored cheesecake', 
        price: 9.0,
        ingredients: ['Cream Cheese', 'Matcha', 'White Chocolate'],
        popular: false,
        new: true,
        calories: 320
      },
      { 
        id: 25, 
        name: 'Nutella Cheesecake', 
        description: 'Chocolate hazelnut cheesecake', 
        price: 9.5,
        ingredients: ['Cream Cheese', 'Nutella', 'Hazelnuts'],
        popular: true,
        new: false,
        calories: 450
      }
    ],
    mint: [
      { 
        id: 26, 
        name: 'Fresh Mint Tea', 
        description: 'Traditional Moroccan mint tea', 
        price: 3.0,
        ingredients: ['Green Tea', 'Fresh Mint', 'Sugar'],
        popular: true,
        new: false,
        calories: 10
      },
      { 
        id: 27, 
        name: 'Sage Tea', 
        description: 'Herbal sage infusion', 
        price: 3.5,
        ingredients: ['Sage Leaves', 'Honey', 'Lemon'],
        popular: false,
        new: true,
        calories: 5
      },
      { 
        id: 28, 
        name: 'Chamomile Tea', 
        description: 'Calming chamomile flowers', 
        price: 3.0,
        ingredients: ['Chamomile Flowers', 'Honey'],
        popular: true,
        new: false,
        calories: 5
      },
      { 
        id: 29, 
        name: 'Ginger & Lemon', 
        description: 'Warming ginger with lemon', 
        price: 4.0,
        ingredients: ['Fresh Ginger', 'Lemon', 'Honey'],
        popular: true,
        new: false,
        calories: 20
      }
    ],
    hot: [
      { 
        id: 30, 
        name: 'Hot Chocolate', 
        description: 'Rich Belgian hot chocolate', 
        price: 5.0,
        ingredients: ['Belgian Chocolate', 'Milk', 'Cream'],
        popular: true,
        new: false,
        calories: 220
      },
      { 
        id: 31, 
        name: 'Spiced Apple Cider', 
        description: 'Warm apple cider with spices', 
        price: 4.5,
        ingredients: ['Apple Juice', 'Cinnamon', 'Cloves', 'Orange'],
        popular: false,
        new: true,
        calories: 120
      },
      { 
        id: 32, 
        name: 'Golden Milk', 
        description: 'Turmeric and coconut milk latte', 
        price: 5.5,
        ingredients: ['Turmeric', 'Coconut Milk', 'Cinnamon', 'Ginger'],
        popular: true,
        new: false,
        calories: 90
      }
    ]
  };

  // فلترة وترتيب العناصر
  const filteredItems = menuItems[activeCategory]
    ?.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        case 'new':
          return (b.new ? 1 : 0) - (a.new ? 1 : 0);
        default:
          return 0;
      }
    }) || [];

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Our <span className="highlight">Menu</span>
          </h2>
          <p className="section-subtitle">
            Discover our extensive selection of drinks, argileh, and desserts
          </p>
        </div>

        {/* Menu Stats */}
        <div className="menu-stats">
          <div className="stat-item">
            <span className="stat-number">{Object.values(menuItems).flat().length}+</span>
            <span className="stat-label">Items</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{menuCategories.length}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">Favorites</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">${getCartTotal().toFixed(2)}</span>
            <span className="stat-label">Cart Total</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="menu-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            
            <div className="sort-dropdown">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Sort by</option>
                <option value="popular">Most Popular</option>
                <option value="new">New Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="filters-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="filter-options">
                <div className="filter-group">
                  <h4>Special Tags</h4>
                  <div className="filter-tags">
                    <button className={`filter-tag ${sortBy === 'popular' ? 'active' : ''}`}
                      onClick={() => setSortBy(sortBy === 'popular' ? 'default' : 'popular')}>
                      <FaStar /> Popular
                    </button>
                    <button className={`filter-tag ${sortBy === 'new' ? 'active' : ''}`}
                      onClick={() => setSortBy(sortBy === 'new' ? 'default' : 'new')}>
                      New
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Tabs */}
        <div className="menu-categories">
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
              <span className="category-count">{menuItems[category.id]?.length || 0}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          className="menu-items-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <motion.div
                key={item.id}
                className="menu-item-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                {/* Item Badges */}
                <div className="item-badges">
                  {item.popular && (
                    <span className="badge popular">
                      <FaStar /> Popular
                    </span>
                  )}
                  {item.new && (
                    <span className="badge new">New</span>
                  )}
                  {item.alcoholic !== undefined && (
                    <span className={`badge ${item.alcoholic ? 'alcoholic' : 'non-alcoholic'}`}>
                      {item.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
                    </span>
                  )}
                </div>

                {/* Item Content */}
                <div className="item-content">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-actions">
                      <button 
                        className={`action-btn favorite-btn ${favorites.includes(item.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(item.id)}
                        aria-label={favorites.includes(item.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <FaHeart />
                      </button>
                      <button 
                        className="action-btn cart-btn"
                        onClick={() => addToCart(item)}
                        aria-label="Add to cart"
                      >
                        <FaCartPlus />
                      </button>
                    </div>
                  </div>
                  
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-details">
                    <div className="ingredients">
                      <span className="detail-label">Ingredients:</span>
                      <div className="ingredient-tags">
                        {item.ingredients.map((ingredient, idx) => (
                          <span key={idx} className="ingredient-tag">{ingredient}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="item-meta">
                      {item.calories && (
                        <span className="meta-item">🔥 {item.calories} cal</span>
                      )}
                      {item.duration && (
                        <span className="meta-item">⏱️ {item.duration}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item Footer */}
                <div className="item-footer">
                  <div className="item-price">
                    <span className="price-currency">$</span>
                    <span className="price-value">{item.price.toFixed(2)}</span>
                  </div>
                  <motion.button 
                    className="add-to-cart-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(item)}
                  >
                    <FaCartPlus />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try a different search or category</p>
            </div>
          )}
        </motion.div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div 
            className="cart-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="cart-header">
              <h3>Your Order ({cart.length} items)</h3>
              <span className="cart-total">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="cart-items-preview">
              {cart.slice(0, 3).map(item => (
                <div key={item.id} className="cart-preview-item">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-quantity">x{item.quantity}</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {cart.length > 3 && (
                <div className="cart-more-items">+{cart.length - 3} more items</div>
              )}
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Menu;