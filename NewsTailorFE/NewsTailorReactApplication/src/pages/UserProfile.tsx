import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import Sidebar from '../Sidebar';
import Logo from "../Logo.tsx";
import '../styles/user-profile/UserProfile.css';

function UserProfile() {
    const { userId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userId);
    const [password, setPassword] = useState(userId);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div>
            <Sidebar/>
            <Logo/>
            <div className="container">
                <h1 className="header">User Profile</h1>
                <div className="card">
                    <form>
                        <button type="button" onClick={handleEditClick}>
                            <MdEdit className="icon"/>
                        </button>
                        <div className="form-field">
                            <label htmlFor="username">Username:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{username || 'Enter your username'}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Password:</label>
                            {isEditing ? (
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{password ? '*' : 'Enter your password'}</p>
                            )}
                        </div>

                        {isEditing && <button type="submit">Update</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;