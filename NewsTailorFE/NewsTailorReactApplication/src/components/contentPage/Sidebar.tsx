import React from 'react';
import {
    MdHome,
    MdDescription,
    MdBookmark,
    MdPerson,
} from 'react-icons/md';
import {Link} from 'react-router-dom';
import "./sidebar.css";
import {isAdministrator} from "../../utils/authUtils.ts";
import {FaUserCog} from "react-icons/fa";


interface SidebarProps {
    userId?: string | undefined
}

const Sidebar: React.FC<SidebarProps> = ({userId}) => {
    return (
        <aside className="sidebar">
            <nav className="nav">
                <Link className="navItem" to={`/${userId}`} state={{userId}} id='homePageLink'>
                    <MdHome className="icon"/>
                    Home
                </Link>
                <Link className="navItem" to={`/newspapers/${userId}`} id='newspaperLink'>
                    <MdDescription className="icon"/>
                    Your Newspapers
                </Link>
                <Link className="navItem" to={`/templates`} id='templateLink'>
                    <MdBookmark className="icon" />
                    Templates
                </Link>
                <Link className="navItem" to={`/profile/${userId}`} id='userProfileLink'>
                    <MdPerson className="icon"/>
                    Profile
                </Link>
                {isAdministrator() && (
                    <Link className="navItem" to="/admin" id='adminLink'>
                        <FaUserCog className="icon"/>
                        Admin
                    </Link>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
