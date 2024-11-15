import React, { useState, useEffect } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";

const useProfileForm = () => {
    const { userId } = useParams<{ userId: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [wpm, setWpm] = useState(0);
    const [wpmString, setWpmString] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/user/${userId}/`);
                const { username, email, wpm } = response.data;
                setUsername(username);
                setEmail(email);
                setWpm(wpm);
                setWpmString(wpm === '200' ? 'Slow ' : wpm === '250' ? 'Average ' : 'Fast ');
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
        setIsEditing(true);
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
    };
};

export default useProfileForm;
