import LoginForm from "../loginForm/LoginForm";
import RegisterForm from "../registerForm/RegisterForm";
import useAuthMode from "./useAuthMode";
import authImage from "../../assets/auth.svg"
import "./auth.css"

function Auth() {
    const { isSignUpMode, enableSignUpMode, enableSignInMode } = useAuthMode();

    const handleRegisterSuccess = () => {
        enableSignInMode();
    }

    return (
        <div className={`auth-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="auth-forms-container">
            <div className="signin-signup">
                <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                <LoginForm />
            </div>
        </div>
        <div className="auth-panels-container">
            <div className="auth-panel auth-panel-left">
                <div className="auth-panel-content">
                    <h3>New here ?</h3>
                    <p>
                        Sign up today to unlock the full potential of our AI news search! Tailor your news experience and
                        save your favorite articles. Don't miss out on the conversation!
                    </p>
                    <button onClick={enableSignUpMode} className="auth-btn transparent">
                        Sign up
                    </button>
                </div>
                <img src={authImage} className="auth-image" alt="" />
            </div>
            <div className="auth-panel auth-panel-right">
                <div className="auth-panel-content">
                    <h3>One of us ?</h3>
                    <p>
                        Welcome back! Log in to access your personalized news feed and stay updated with the stories that matter most to you.
                    </p>
                    <button onClick={enableSignInMode} className="auth-btn transparent">
                        Sign In
                    </button>
                </div>
                <img src={authImage} className="auth-image" alt="" />
            </div>
        </div>
      </div>
    );
}

export default Auth