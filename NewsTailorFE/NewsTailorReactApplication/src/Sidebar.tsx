import React from 'react';
import { MdHome, MdDescription, MdBookmark, MdPerson } from 'react-icons/md';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav className="nav">
        <a className="navItem" href="#home">
          <MdHome className="icon" />
          Home
        </a>
        <a className="navItem" href="#newspapers">
          <MdDescription className="icon" />
          Your Newspapers
        </a>
        <a className="navItem" href="#templates">
          <MdBookmark className="icon" />
          Templates
        </a>
        <a className="navItem" href="#profile">
          <MdPerson className="icon" />
          Profile
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
