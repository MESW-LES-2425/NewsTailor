import React from "react";
import useRegisterForm from "./useRegisterForm";
import PasswordChecklist from "react-password-checklist";
import "./registerForm.css"

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
                <button className="form-button" type="submit" disabled={isLoading || !isPasswordValid}>
                    {isLoading ? "Registering..." : "Register"}
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
};

export default RegisterForm;