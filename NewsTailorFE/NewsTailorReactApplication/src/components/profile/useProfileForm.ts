import React, {useState, useEffect} from "react";
import api from "../../api";
import {useParams} from "react-router-dom";
import axios from "axios";

const useProfileForm = () => {
    const {userId} = useParams<{ userId: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/user/${userId}/`);
                const {username, email} = response.data;
                setUsername(username);
                setEmail(email);
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.put(`/api/user/update/${userId}/`, {username, email});
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
        handleEditClick,
        handleInputChange,
        handleSubmit,
    };
};

export default useProfileForm;