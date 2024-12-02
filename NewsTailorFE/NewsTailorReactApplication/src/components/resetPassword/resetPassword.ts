import React, {ChangeEvent, useState} from "react";
import api from "../../api.ts";

interface FormData {
    password: string;
    confirmPassword: string;
}

const useResetPassword = () => {
    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [showPasswordCheckList, setShowPasswordCheckList] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleValidPassword = (valid: boolean) => setPasswordValid(valid)

    const toggleShowPassword = (show:boolean) => setShowPassword(show);

    const toggleShowPasswordCheckList = (show:boolean) => setShowPasswordCheckList(show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData);
    };
    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        const id = window.location.pathname.split("/")[2];
        const token = window.location.pathname.split("/")[3];

        if(!isPasswordValid){
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        const request = { id: id, password: formData.password, token: token };
        api.post("/api/password-reset/", request).then((response) => {
            setLoading(false);
            if (response.status === 200) {
                window.location.href = "/auth";
            } else {
                alert("Failed to reset password. Please try again.");
            }
        }).catch(() => {
            setLoading(false);
            alert("Failed to reset password. Please try again.");
        });
    }

    return {
        formData,
        isLoading,
        handleValidPassword,
        toggleShowPasswordCheckList,
        toggleShowPassword,
        showPasswordCheckList,
        showPassword,
        handleChange,
        handleResetPassword,
    };
}

export default useResetPassword;