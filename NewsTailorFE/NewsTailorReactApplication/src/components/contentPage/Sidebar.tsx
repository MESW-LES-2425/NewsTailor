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

const user_id = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')!).id : undefined;

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <aside className="sidebar">
            <nav className="nav">
                <Link className="navItem" to={`/home`} state={{user_id}} id='homePageLink'>
                    <MdHome className="icon"/>
                    Home
                </Link>
                <Link className="navItem" to={`/newspapers/${user_id}`} id='newspaperLink'>
                    <MdDescription className="icon"/>
                    Your Newspapers
                </Link>
                <Link className="navItem" to={`/templates`} id='templateLink'>
                    <MdBookmark className="icon" />
                    Templates
                </Link>
                <Link className="navItem" to={`/profile/${user_id}`} id='userProfileLink'>
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
