import React from 'react';
import './css/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">
        NewsTailor <span role="img" aria-label="news icon">📰</span>
      </h1>
    </header>
  );
};

export default Header;
