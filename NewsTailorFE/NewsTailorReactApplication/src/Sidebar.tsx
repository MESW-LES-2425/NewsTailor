import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h3 className="logo">NewsTailor 📰</h3>
      <nav className="nav">
        <a className="navItem" href="#home">
          🏠 Home
        </a>
        <a className="navItem" href="#newspapers">
          📰 Your Newspapers
        </a>
        <a className="navItem" href="#templates">
          🔖 Templates
        </a>
        <a className="navItem" href="#profile">
          👤 Profile
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
