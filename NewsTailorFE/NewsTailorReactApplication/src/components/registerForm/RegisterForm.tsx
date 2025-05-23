import React from "react";
import useRegisterForm from "./useRegisterForm";
import PasswordChecklist from "react-password-checklist";
import "../../styles/auth-common/signin-signup.css";
import "./registerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faEye, faEyeSlash, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {useGoogleLogin} from "@react-oauth/google";
import api from "../../api.ts";

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
        loginToApp,
    } = useRegisterForm({ onRegisterSuccess });

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                const loginResponse = await api.post(
                    `${import.meta.env.VITE_API_URL}/auth/api/login/google/`, {
                        code: codeResponse.code,
                    });
                console.log("Google login response:", loginResponse);
                loginToApp(loginResponse);
            } catch (error) {
                console.error("Google login error:", error);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

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
                    onClick={() => toggleShowPassword1(!showPassword1)} data-testid="toggle-password-icon"
                />
                <FontAwesomeIcon icon={faQuestionCircle} className="password-info-icon" data-testid="password-info-icon"
                    onMouseEnter={() => toggleShowPasswordCheckList(true)}
                    onMouseLeave={() => toggleShowPasswordCheckList(false)}
                />
                <div className="password-checklist" style={{ visibility: showPasswordCheckList ? "visible" : "hidden" }} data-testid="password-checklist">
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
                    onClick={() => toggleShowPassword2(!showPassword2)} data-testid="toggle-password-icon"
                />
            </div>
            <button id="register-button" className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
                <a onClick={googleLogin} className="social-icon" data-testid="google-icon">
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
            </div>
        </form>
    );
};

export default RegisterForm;
