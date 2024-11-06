import React from 'react';
import '../../styles/landingPage/Header.css';
import newspaperImage from '../../assets/newspaper.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">
        NewsTailor 
        <img src={newspaperImage} alt="news icon" className="news-icon" />
      </h1>
    </header>
  );
};

export default Header;
