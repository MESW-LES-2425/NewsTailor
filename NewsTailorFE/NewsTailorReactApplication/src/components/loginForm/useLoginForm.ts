import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO} from "../../constants";
import {useUserContext} from "../../context/useUserContext.ts";

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
    const navigate = useNavigate();
    const {setUser}= useUserContext();

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
            loginToApp(loginResponse);
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

    const loginToApp = (loginResponse: any) => {
        const userId = loginResponse.data.id;
        const {id, username, email} = loginResponse.data;

        localStorage.setItem(ACCESS_TOKEN, loginResponse.data.tokens.access);
        localStorage.setItem(REFRESH_TOKEN, loginResponse.data.tokens.refresh);
        localStorage.setItem(USER_INFO, JSON.stringify({id, username, email}));

        setUser({
            id: id,
            username: username,
            email: email,
        })

        navigate(`/home`, {state: {userId}});
    }

    return {
        formData,
        isLoading,
        toggleShowPassword,
        showPassword,
        errors,
        handleChange,
        handleSubmit,
        loginToApp,
    }

}

export default useLoginForm;
