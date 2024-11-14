import { MdEdit } from 'react-icons/md';
import Header from '../landingPage/Header.tsx';
import useProfileForm from './useProfileForm';
import './Profile.css';
import Sidebar from "../contentPage/Sidebar.tsx";

function ProfileForm() {
    const {
        userId,
        isEditing,
        username,
        email,
        wpm,
        wpmString,
        handleEditClick,
        handleInputChange,
        handleSubmit,
    } = useProfileForm();

    return (
        <div>
            <Sidebar userId={userId} />
            <Header />
            <div className="container">
                <h1 className="header">User Profile</h1>
                <div className="card">
                    <form role="form" onSubmit={handleSubmit}>
                        <button type="button" onClick={handleEditClick} aria-label="edit">
                            <MdEdit className="icon" />
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
                            <label htmlFor="email">Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{email || 'Enter your email'}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor={"wpm"}>Words per minute:</label>
                            {isEditing ? (
                                <>
                                    <select
                                        id="wpm"
                                        name="wpm"
                                        value={wpm}
                                        onChange={handleInputChange}
                                    >
                                        <option value="300">Fast (300wpm)</option>
                                        <option value="250">Average (250wpm)</option>
                                        <option value="200">Slow (200wpm)</option>
                                    </select>
                                </>
                            ) : (
                                <p>{wpmString +"(" + wpm + "wpm)" || 'Enter your wpm'}</p>
                            )}
                        </div>

                        {isEditing && <button type="submit" >Update</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;