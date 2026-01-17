import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <Link to="/" className="header-link">
        <img src="/logo.png" alt="Noctis Logo" className="header-logo" />
        <div className="header-text">
          <h1 className="header-title">Noctis</h1>
          <p className="header-subtitle">Le calendrier astrologique</p>
        </div>
      </Link>
    </div>
  </header>
);

export default Header;
