import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  showFullHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showFullHeader = false }) => (
  <header className="header">
    {showFullHeader ? (
    <div className="header-content">
      <Link to="/" className="header-link">
        <img src="/logo.png" alt="Noctis Logo" className="header-logo" />
        <div className="header-text">
          <h1 className="header-title">Noctis</h1>
          <p className="header-subtitle">Le calendrier astrologique</p>
        </div>
      </Link>
    </div>
    ) : (
      <div className="header-button-container">
        <Link to="/" className="header-home-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L3 8V18H8V13H12V18H17V8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span>Accueil</span>
        </Link>
      </div>
    )}
  </header>
);

export default Header;
