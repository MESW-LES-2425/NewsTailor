import {useState, useEffect} from 'react';
import axios from 'axios';
import api from "../../api.ts";
import "./admin.css";
import {faBan, faCheck, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



const UserList = () => {
    const [users, setUsers] = useState<{ user_id: number, username: string; is_banned: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [newspapersCount, setNewspapersCount] = useState<number>(0);
    const [templatesCount, setTemplatesCount] = useState<number>(0);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/users/`);
                const newspapers_count = await api.get(`/api/newspaper-count/`);
                const templates_count = await api.get(`/api/configuration-count/`);
                setUsers(Array.isArray(response.data) ? response.data : []);
                setNewspapersCount(newspapers_count.data.NewspaperCount);
                setTemplatesCount(templates_count.data.total_count);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error(error.response.data);
                } else {
                    console.error("Error fetching users", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    const banUser = (user_id: number) => async () => {
        try {
            await api.post(`api/users/ban/${user_id}/`);
            setUsers(users.map(user => {
                if (user.user_id === user_id) {
                    return {
                        ...user,
                        is_banned: !user.is_banned
                    };
                }
                return user;
            }));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(error.response.data);
            } else {
                console.error("Error banning user", error);
            }
        }
    }

    const deleteUser = (user_id: number) => async () => {
        try {
            await api.delete(`/api/users/delete/${user_id}/`);
            setUsers(users.filter(user => user.user_id !== user_id));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    }

    return (
        <div className="info-container">
            <div id="usage-data">
                <h1>Usage Data</h1>
                <p>Number of created newspapers: {newspapersCount}</p>
                <p>Number of created templates: {templatesCount}</p>
            </div>
            <div className='user-list'>
            <h1>Users</h1>
            {loading ? (
                <div className="spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.user_id}>
                            <p className={user.is_banned ? "banned" : ""}>{user.username}</p>
                            {user.username === "admin" ? null : (
                                <>
                                    <button onClick={banUser(user.user_id)}>
                                        {user.is_banned ? (
                                            <FontAwesomeIcon icon={faCheck} size="lg" />
                                        ) : (
                                            <FontAwesomeIcon icon={faBan} size="lg" />
                                        )}
                                    </button>
                                    <button onClick={deleteUser(user.user_id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <Link to={`/home`} style={{ textDecoration: "none" }}>
                <button className="home-button">Home</button>
            </Link>
        </div>
    );
}

export default UserList;
