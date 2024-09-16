// src/components/Navbar/Navbar.tsx
import React from 'react';
import './index.scss';

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  return (
    <nav className="navbar">
      <button onClick={toggleSidebar} aria-label="Toggle Navigation">
        <div className={`hamburgerMenu ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </nav>
  );
};

export default Navbar;
