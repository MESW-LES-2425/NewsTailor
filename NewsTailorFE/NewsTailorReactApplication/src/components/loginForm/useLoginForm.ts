import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

interface FormData {
    email: string;
    password: string;
}

const useLoginForm = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password:""
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const route = "/api/login/";
    const getTokensRoute = "/api/token/";
    const navigate = useNavigate();

    const toggleShowPassword = (show:boolean) => setShowPassword(show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        setErrors({});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading)
            return;

        setLoading(true);
        setErrors({});

        try {
            const loginResponse = await api.post(route, formData);
            const userId = loginResponse.data.id;
            const tokenResponse = await api.post(getTokensRoute, formData);
            localStorage.setItem(ACCESS_TOKEN, tokenResponse.data.access);
            localStorage.setItem(REFRESH_TOKEN, tokenResponse.data.refresh);
            navigate("/", {state: {userId}});
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data);
            } else {
                console.error("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        formData,
        isLoading,
        toggleShowPassword,
        showPassword,
        errors,
        handleChange,
        handleSubmit,
    }

}

export default useLoginForm;