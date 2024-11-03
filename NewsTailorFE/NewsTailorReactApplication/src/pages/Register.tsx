import api from "../api";
import { useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../styles/Form.css"
import PasswordChecklist from "react-password-checklist"

interface FormData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password1: "",
        password2: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    
    const route = "/api/register/";
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        setErrors({});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(loading) return;
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
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-content">
                <h1>Register</h1>
                <input type="text" className="form-input" name="username" value={formData.username}
                    onChange={handleChange} placeholder="Username" required
                />
                {errors.username && <p className="error">{errors.username.join(", ")}</p>}
                <input type="email" className="form-input" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
                {errors.email && <p className="error">{errors.email.join(", ")}</p>}
                <input type="text" className="form-input" name="password1" value={formData.password1}
                    onChange={handleChange} placeholder="Password" required
                />
                {errors.password && <p className="error">{errors.password.join(", ")}</p>}
                <input type="text" className="form-input" name="password2" value={formData.password2}
                    onChange={handleChange} placeholder="Confirm Password" required
                />
                <button className="form-button" type="submit" disabled={loading || !isPasswordValid}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </div>
            <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={formData.password1}
				valueAgain={formData.password2}
				onChange={(isValid) => setPasswordValid(isValid)}
			/>
        </form>
    );

}

export default Register