import React from "react";
import useLoginForm from "./useLoginForm";
import "./loginForm.css"
import "../../styles/auth-commun/signin-signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const LoginForm : React.FC = () => {
    const {
        formData,
        isLoading,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="signin-signup-title">Sign in</h2>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faEnvelope} className="auth-icons"/>
                <input type="text" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
            </div>
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faLock} className="auth-icons"/>
                <input type="password" name="password" value={formData.password}
                    onChange={handleChange} placeholder="Password" required
                />
            </div>
            <button className="auth-btn solid" type="submit" disabled={isLoading}>
                    {isLoading ? "Login In..." : "Login"}
            </button> 
            <p className="social-text">Or Sign in with social platforms</p> 
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

export default LoginForm