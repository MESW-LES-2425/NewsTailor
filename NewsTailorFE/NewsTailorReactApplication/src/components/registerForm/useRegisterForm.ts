import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import axios from "axios";

interface FormData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

interface callBackFunction {
    onRegisterSuccess: () => void;
}

const useRegisterForm = ({ onRegisterSuccess }: callBackFunction) => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password1: "",
        password2: ""
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [showPasswordCheckList, setShowPasswordCheckList] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    
    const route = "/api/register/";

    const handleValidPassword = (valid: boolean) => setPasswordValid(valid)

    const toggleShowPassword1 = (show:boolean) => setShowPassword1(show);

    const toggleShowPassword2 = (show:boolean) => setShowPassword2(show);

    const toggleShowPasswordCheckList = (show:boolean) => setShowPasswordCheckList(show);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;
        setLoading(true);
        
        setErrors({});

        if(!isPasswordValid){
            setLoading(false)
            return; 
        }

        try {
            await api.post(route, formData);
            onRegisterSuccess();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data);
            } else {
                console.error("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
};

export default useRegisterForm;
