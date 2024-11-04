import React from "react";
import useRegisterForm from "./useRegisterForm";
import PasswordChecklist from "react-password-checklist";
import "../../styles/auth-commun/signin-signup.css";
import "./registerForm.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
const RegisterForm: React.FC = () => {
    const {
        formData,
        isLoading,
        isPasswordValid,
        setPasswordValid,
        errors,
        handleChange,
        handleSubmit,
    } = useRegisterForm();

    return (
        <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="signin-signup-title">Register</h2>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faUser} className="auth-icons"/>
                <input type="text" name="username" value={formData.username}
                    onChange={handleChange} placeholder="User" required
                />
            </div>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faEnvelope} className="auth-icons"/>
                <input type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
            </div>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faLock} className="auth-icons"/>
                <input type="password" name="password1" value={formData.password1}
                    onChange={handleChange} placeholder="Password" required
                />
            </div>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faLock} className="auth-icons"/>
                <input type="password" name="password2" value={formData.password2}
                    onChange={handleChange} placeholder="Confirm Password" required
                />
            </div>
            <button className="auth-btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
            </button> 
            <p className="social-text">Or Sign up with social platforms</p> 
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faFacebookF} className="fab fa-facebook-f"/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faTwitter} className="fab fa-twitter"/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faGoogle} className="fab fa-google"/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in"/>
                </a>
            </div> 
        </form>
    );
};

export default RegisterForm;