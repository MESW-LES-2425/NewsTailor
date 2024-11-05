import React, { useState } from "react";
import useLoginForm from "./useLoginForm";
import "./loginForm.css";
import "../../styles/auth-commun/signin-signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const LoginForm: React.FC = () => {
    const {
        formData,
        isLoading,
        toggleShowPassword,
        showPassword,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="signin-signup-title">Sign in</h2>    
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faEnvelope} className="auth-icons" />
                <input type="text" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>    
            <div className="signin-signup-input-field" style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faLock} className="auth-icons" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password}
                    onChange={handleChange} placeholder="Password" required
                />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password-icon"
                    onClick={() => toggleShowPassword(!showPassword)}
                />
            </div>         
            {errors.non_field_error && <p className="error-message">{errors.non_field_error}</p>}          
            <button className="auth-btn solid" type="submit" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Login"}
            </button>   
            <p className="social-text">Or Sign in with social platforms</p>     
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </div>
        </form>
    );
};

export default LoginForm;
