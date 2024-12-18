import React, {useState} from 'react';
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
    const activeTab = localStorage.getItem('activeTab') || 'home';

    const setActiveTab = (tab: string) => {
        localStorage.setItem('activeTab', tab);
    };

    return (
        <aside className="sidebar">
            <nav className="nav">
                <Link
                    className={`navItem ${activeTab === 'home' ? 'active' : ''}`}
                    to={`/home`}
                    state={{user_id}}
                    id='homePageLink'
                    onClick={() => setActiveTab('home')}
                >
                    <MdHome className="icon"/>
                    Home
                </Link>
                <Link
                    className={`navItem ${activeTab === 'newspapers' ? 'active' : ''}`}
                    to={`/newspapers/${user_id}`}
                    id='newspaperLink'
                    onClick={() => setActiveTab('newspapers')}
                >
                    <MdDescription className="icon"/>
                    Your Newspapers
                </Link>
                <Link
                    className={`navItem ${activeTab === 'templates' ? 'active' : ''}`}
                    to={`/templates`}
                    id='templateLink'
                    onClick={() => setActiveTab('templates')}
                >
                    <MdBookmark className="icon"/>
                    Templates
                </Link>
                <Link
                    className={`navItem ${activeTab === 'profile' ? 'active' : ''}`}
                    to={`/profile/${user_id}`}
                    id='userProfileLink'
                    onClick={() => setActiveTab('profile')}
                >
                    <MdPerson className="icon"/>
                    Profile
                </Link>
                {isAdministrator() && (
                    <Link
                        className={`navItem ${activeTab === 'admin' ? 'active' : ''}`}
                        to="/admin"
                        id='adminLink'
                        onClick={() => setActiveTab('admin')}
                    >
                        <FaUserCog className="icon"/>
                        Admin
                    </Link>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
