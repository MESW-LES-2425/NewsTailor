import { useState } from "react";

function useAuthMode() {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const enableSignUpMode = () => setIsSignUpMode(true);
    const enableSignInMode = () => setIsSignUpMode(false);

    return {
        isSignUpMode,
        enableSignUpMode,
        enableSignInMode
    };
}

export default useAuthMode;
