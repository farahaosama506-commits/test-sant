import React, { useState } from 'react';
import { menuData } from '../../data/menuData';

const Menu = () => {
  const [activeMenuTab, setActiveMenuTab] = useState('coffee');
  const categories = Object.keys(menuData);

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        
        <div className="menu-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`menu-tab ${activeMenuTab === category ? 'active' : ''}`}
              onClick={() => setActiveMenuTab(category)}
            >
              {menuData[category].name}
            </button>
          ))}
        </div>

        <div className="menu-content">
          <div className="menu-grid">
            {menuData[activeMenuTab].items.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="menu-item-price">${item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;