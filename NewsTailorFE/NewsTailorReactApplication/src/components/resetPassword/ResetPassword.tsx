import "./ResetPassword.css";
import "../../index.css"
import {faEye, faEyeSlash, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useResetPassword from "./resetPassword";
import PasswordChecklist from "react-password-checklist";

const ResetPassword = () => {
    const {
        formData,
        isLoading,
        handleValidPassword,
        toggleShowPasswordCheckList,
        toggleShowPassword,
        showPasswordCheckList,
        showPassword,
        handleChange,
        handleResetPassword,
    } = useResetPassword();

    return (
        <div className="reset-password container">
            <h2 className="signin-signup-title">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <div className={"pass-reset"}>
                        <input type={showPassword ? "text" : "password"} name="password"
                               onChange={handleChange} placeholder="Password" required
                        />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password-icon"
                                         onClick={() => toggleShowPassword(!showPassword)}
                                         data-testid="toggle-password-icon"
                        />
                        <FontAwesomeIcon icon={faQuestionCircle} className="password-info-icon"
                                         data-testid="password-info-icon"
                                         onMouseEnter={() => toggleShowPasswordCheckList(true)}
                                         onMouseLeave={() => toggleShowPasswordCheckList(false)}
                        />
                        <div className="password-checklist"
                             style={{visibility: showPasswordCheckList ? "visible" : "hidden"}}
                             data-testid="password-checklist">
                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "match"]}
                                minLength={8}
                                value={formData.password}
                                valueAgain={formData.confirmPassword}
                                onChange={(isValid) => handleValidPassword(isValid)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type={"password"} name="confirmPassword"
                           onChange={handleChange} placeholder="Confirm Password" required
                    />
                </div>
                <button className="auth-btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}

export default ResetPassword;