import React from "react";
import useRegisterForm from "./useRegisterForm";
import PasswordChecklist from "react-password-checklist";
import "../../styles/auth-common/signin-signup.css";
import "./registerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faEye, faEyeSlash, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

interface callBackFunction {
    onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<callBackFunction> = ({ onRegisterSuccess }) => {
    const {
        formData,
        isLoading,
        handleValidPassword,
        toggleShowPasswordCheckList,
        toggleShowPassword1,
        toggleShowPassword2,
        showPasswordCheckList,
        showPassword1,
        showPassword2,
        errors,
        handleChange,
        handleSubmit,
    } = useRegisterForm({ onRegisterSuccess });

    return (
        <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="signin-signup-title">Register</h2>
            <div className={`signin-signup-input-field ${errors.username ? "error-auth-border" : ""}`}>
                <FontAwesomeIcon icon={faUser} className="auth-icons" />
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                    placeholder="User" required
                />
            </div>
            {errors.username && <p className="error-auth-message">{errors.username.join(", ")}</p>}
            <div className={`signin-signup-input-field ${errors.email ? "error-auth-border" : ""}`}>
                <FontAwesomeIcon icon={faEnvelope} className="auth-icons" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="Email" required
                />
            </div>
            {errors.email && <p className="error-auth-message">{errors.email.join(", ")}</p>}
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faLock} className="auth-icons" />
                <input type={showPassword1 ? "text" : "password"} name="password1" value={formData.password1}
                    onChange={handleChange} placeholder="Password" required
                />
                <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} className="toggle-password-icon"
                    onClick={() => toggleShowPassword1(!showPassword1)}
                />
                <FontAwesomeIcon icon={faQuestionCircle} className="password-info-icon"
                    onMouseEnter={() => toggleShowPasswordCheckList(true)}
                    onMouseLeave={() => toggleShowPasswordCheckList(false)}
                />
                <div className="password-checklist" style={{ visibility: showPasswordCheckList ? "visible" : "hidden" }}>
                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={8}
                        value={formData.password1}
                        valueAgain={formData.password2}
                        onChange={(isValid) => handleValidPassword(isValid)}
                    />
                </div>
            </div>
            {errors.password && <p className="error">{errors.password.join(", ")}</p>}
            <div className="signin-signup-input-field">
                <FontAwesomeIcon icon={faLock} className="auth-icons" />
                <input type={showPassword2 ? "text" : "password"} name="password2" value={formData.password2}
                    onChange={handleChange} placeholder="Confirm Password" required
                />
                <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} className="toggle-password-icon"
                    onClick={() => toggleShowPassword2(!showPassword2)}
                />
            </div>
            <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
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

export default RegisterForm;
