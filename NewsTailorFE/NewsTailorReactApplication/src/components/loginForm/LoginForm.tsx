import React from "react";
import useLoginForm from "./useLoginForm";
import "./loginForm.css"


const LoginForm : React.FC = () => {
    const {
        formData,
        isLoading,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-content">
                <h1>Login</h1>
                <input type="text" className="form-input" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input type="text" className="form-input" name="password" value={formData.password}
                    onChange={handleChange} placeholder="Password" required
                />
                {errors.non_field_error && <p className="error-message">{errors.non_field_error}</p>}
                <button className="form-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Login In..." : "Login"}
                </button>     
            </div>
        </form>
    );
};

export default LoginForm