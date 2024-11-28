import React, {useState} from "react";
import useLoginForm from "./useLoginForm";
import "./loginForm.css";
import "../../styles/auth-common/signin-signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Modal from "../../utils/Modal";
import api from "../../api.ts";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            const request = { "email": email, "host": window.location.origin };
            api.post("/api/forgot-password/", request).then((response) => {
                console.log("Reset password form submitted with email:", email);
                if (response.status === 200) {
                    alert("Password reset link has been sent to your email.");
                    setIsModalOpen(false);
                } else {
                    alert("Please enter a valid email.");
                }
            });
        } else {
            alert("Please enter your email to reset password.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <h2 className="signin-signup-title">Sign in</h2>
                <div className={`signin-signup-input-field ${errors.email ? "error-auth-border" : ""}`}>
                    <FontAwesomeIcon icon={faEnvelope} className="auth-icons" />
                    <input type="text" name="email" value={formData.email}
                        onChange={handleChange} placeholder="Email" required
                    />
                </div>
                {errors.email && <p className="error-auth-message">{errors.email}</p>}
                <div className="signin-signup-input-field" style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faLock} className="auth-icons" />
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password}
                        onChange={handleChange} placeholder="Password" required
                    />
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password-icon"
                        onClick={() => toggleShowPassword(!showPassword)} data-testid="toggle-password-icon"
                    />
                </div>
                {errors.non_field_error && <p className="error-auth-message">{errors.non_field_error}</p>}
                <button className="auth-btn solid" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging In..." : "Login"}
                </button>
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                    <a href="#" className="social-icon" data-testid="facebook-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social-icon" data-testid="twitter-icon">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="social-icon" data-testid="google-icon">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#" className="social-icon" data-testid="linkedin-icon">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </div>
                <p className="auth-other-options">
                    Forgot your password? <a href="#" className="auth-link" onClick={() => setIsModalOpen(true)}>Reset Password</a>
                </p>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleResetPassword}>
                    <h2>Reset Password</h2>
                    <div className="signin-signup-input-field">
                        <FontAwesomeIcon icon={faEnvelope} className="auth-icons" />
                        <input type="email" name="resetEmail" value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
                        />
                    </div>
                    <button className="auth-btn solid" type="submit">Submit</button>
                </form>
            </Modal>
        </>
    );
};

export default LoginForm;