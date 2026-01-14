import { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <svg className="navbar-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 17H21V18C21 18.55 20.55 19 20 19H19V17Z" fill="currentColor"/>
            <path d="M3 17H5V19H4C3.45 19 3 18.55 3 18V17Z" fill="currentColor"/>
            <path d="M21 11L19.25 5.5C19 4.65 18.2 4 17.3 4H6.7C5.8 4 5 4.65 4.75 5.5L3 11V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
            <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
          </svg>
          <span>AutoCare</span>
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><a href="#features">Características</a></li>
            <li><a href="#how-it-works">Cómo Funciona</a></li>
            <li><a href="#pricing">Precios</a></li>
          </ul>

          <div className="navbar-actions">
            <button className="btn btn-ghost" onClick={onLoginClick}>
              Iniciar Sesión
            </button>
            <button className="btn btn-primary" onClick={onSignupClick}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
