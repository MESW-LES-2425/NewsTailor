import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

const useRegisterForm = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password1: "",
        password2: ""
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    
    const navigate = useNavigate();
    const route = "/api/register/";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;
        setLoading(true);

        setErrors({});

        try {
            await api.post(route, formData);
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data);
            } else {
                console.error("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        isPasswordValid,
        setPasswordValid,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useRegisterForm;
