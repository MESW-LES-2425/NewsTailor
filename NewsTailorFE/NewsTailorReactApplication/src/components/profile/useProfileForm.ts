import React, { useState, useEffect } from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {clearAuthTokens} from "../../utils/authUtils.ts";

const useProfileForm = () => {
    const { userId } = useParams<{ userId: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [wpm, setWpm] = useState(0);
    const [wpmString, setWpmString] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/user/${userId}/`);
                const { username, email, wpm } = response.data;
                setUsername(username);
                setEmail(email);
                setWpm(wpm);
                setWpmString(wpm === 200 ? 'Slow ' : wpm === 250 ? 'Average ' : 'Fast ');
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error(error.response.data);
                } else {
                    console.error("An unknown error occurred", error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'wpm') {
            setWpm(parseInt(value, 10));
            setWpmString(value === '200' ? 'Slow ' : value === '250' ? 'Average ' : 'Fast ');
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.put(`/api/user/update/${userId}/`, { username, email, wpm });
            setIsEditing(false);
            console.log("User data updated successfully!", response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(error.response.data);
            } else {
                console.error("There was an error updating the user data!", error);
            }
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await api.delete(`/api/user/delete/${userId}/`);
            console.log("User account deleted successfully!", response.data);
            clearAuthTokens();
            navigate("/landingPage");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(error.response.data);
            } else {
                console.error("There was an error deleting the user account!", error);
            }
        }
    }

    return {
        userId,
        isEditing,
        username,
        email,
        wpm,
        wpmString,
        handleEditClick,
        handleInputChange,
        handleSubmit,
        handleDeleteAccount,
    };
};

export default useProfileForm;
