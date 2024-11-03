import api from "../api";
import { useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"


interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password:""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const route = "/api/login/";
    const getTokensRoute = "/api/token/";
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        setError(null); 
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(loading)
            return;

        setLoading(true);
        setError(null); 

        try {
            await api.post(route, formData);
            const tokenResponse = await api.post(getTokensRoute, formData);
            localStorage.setItem(ACCESS_TOKEN, tokenResponse.data.access);
            localStorage.setItem(REFRESH_TOKEN, tokenResponse.data.refresh);
            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.non_field_errors);
            } else {
                console.error("An unknown error occurred", error);
            } 
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-content">
                <h1>Login</h1>
                <input type="text" className="form-input" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
                <input type="text" className="form-input" name="password" value={formData.password}
                    onChange={handleChange} placeholder="Password" required
                />
                {error && <p className="error-message">{error}</p>}
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Login In..." : "Login"}
                </button>     
            </div>
        </form>
    );

}

export default Login