import React, { useState, useEffect } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";

const userNewspapersForm = () => {
    const { userId } = useParams<{ userId: string }>();
    const [newspapers, setNewspapers] = useState([]);

    useEffect(() => {
        const fetchNewspaper = async () => {
            try {
                const response = await api.get(`/api/newspapers/${userId}/`);
                const newspapers = response.data.Newspapers;
                setNewspapers(newspapers);

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error(error.response.data);
                } else {
                    console.error("An unknown error occurred", error);
                }
            }
        };

        fetchNewspaper();
    }, [userId]);

    return{
        userId,
        newspapers
    };

}    

export default userNewspapersForm;
