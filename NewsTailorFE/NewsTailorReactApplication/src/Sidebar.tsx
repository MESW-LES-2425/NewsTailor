import React from 'react';
import {MdHome, MdDescription, MdBookmark, MdPerson} from 'react-icons/md';
import {Link} from 'react-router-dom';


interface SidebarProps {
    userId?: string | undefined
}

const Sidebar: React.FC<SidebarProps> = ({userId}) => {
    return (
        <aside className="sidebar">
            <nav className="nav">
                <Link className="navItem" to="/">
                    <MdHome className="icon"/>
                    Home
                </Link>
                <Link className="navItem" to="/newspapers">
                    <MdDescription className="icon"/>
                    Your Newspapers
                </Link>
                <Link className="navItem" to="/templates">
                    <MdBookmark className="icon"/>
                    Templates
                </Link>
                <Link className="navItem" to={`/profile/${userId}`}>
                    <MdPerson className="icon"/>
                    Profile
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
