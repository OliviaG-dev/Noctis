import React from 'react';
import './Header.css';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <img src="/logo.png" alt="Noctis Logo" className="header-logo" />
      <div className="header-text">
        <h1 className="header-title">Noctis</h1>
        <p className="header-subtitle">Le calendrier astrologique</p>
      </div>
    </div>
  </header>
);

export default Header;
