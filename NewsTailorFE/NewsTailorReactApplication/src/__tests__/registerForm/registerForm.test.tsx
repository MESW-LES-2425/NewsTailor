import '@testing-library/jest-dom';
import {render, renderHook, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, useNavigate} from "react-router-dom";
import RegisterForm from "../../components/registerForm/RegisterForm.tsx";
import UserEvent from "@testing-library/user-event";
import api from "../../api.ts";
import useRegisterForm from "../../components/registerForm/useRegisterForm.ts";
import {UserProvider} from "../../context/UserContext.tsx";

jest.mock("../../api.ts");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const onRegisterSuccessMock = jest.fn();
const navigate = jest.fn();
const mockedApi = api as jest.Mocked<typeof api>;

describe('RegisterForm', () => {
    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        render(
            <MemoryRouter>
                <UserProvider>
                    <RegisterForm onRegisterSuccess={onRegisterSuccessMock} />
                </UserProvider>
            </MemoryRouter>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders register form correctly', async () => {
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password")

        expect(screen.getByPlaceholderText(/user/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByText('Or Sign up with social platforms')).toBeInTheDocument();
        expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
        expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
        expect(screen.getByTestId('google-icon')).toBeInTheDocument();
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    });

    test('register fields can receive input', async () => {
        const userInput = screen.getByPlaceholderText(/user/i);
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password")

        await UserEvent.type(userInput, 'test');
        await UserEvent.type(emailInput, 'test@example.com');
        await UserEvent.type(passwordInput, 'password123');
        await UserEvent.type(confirmPasswordInput, 'password123');

        expect(userInput).toHaveValue('test');
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
        expect(confirmPasswordInput).toHaveValue('password123');
    })

    test('toggle password visibility on icon click', async () => {
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password")
        const togglePasswordIcons = screen.getAllByTestId("toggle-password-icon");

        await UserEvent.click(togglePasswordIcons[0]);
        expect(passwordInput).toHaveAttribute("type", "text");
        await UserEvent.click(togglePasswordIcons[0]);
        expect(passwordInput).toHaveAttribute("type", "password");

        await UserEvent.click(togglePasswordIcons[1]);
        expect(confirmPasswordInput).toHaveAttribute("type", "text");
        await UserEvent.click(togglePasswordIcons[1]);
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
    })

    test("shows and hides PasswordChecklist on icon hover", async () => {
        const passwordCheckListIcon = screen.getByTestId("password-info-icon");
        const passwordCheckList = screen.getByTestId("password-checklist");

        await UserEvent.hover(passwordCheckListIcon);
        await waitFor(() => expect(passwordCheckList).toBeVisible());

        await UserEvent.unhover(passwordCheckListIcon);
        await waitFor(() => expect(passwordCheckList).not.toBeVisible());
    });

    test("submits form and register with success", async () => {
        mockedApi.post
            .mockResolvedValueOnce({ data: { message: "Register with success!" } });

        const userInput = screen.getByPlaceholderText(/user/i);
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password")
        const submitButton = screen.getByRole("button", { name: /register/i });

        await UserEvent.type(userInput, "testuser");
        await UserEvent.type(emailInput, "test@example.com");
        await UserEvent.type(passwordInput, "Password123#");
        await UserEvent.type(confirmPasswordInput, "Password123#");
        await UserEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith("/api/register/", {
                username: "testuser",
                email: "test@example.com",
                password1: "Password123#",
                password2: "Password123#"
            });
            expect(onRegisterSuccessMock).toHaveBeenCalled();
        });
    });

    test("submits form with taken email or username", async () => {
        mockedApi.post.mockRejectedValueOnce({
            isAxiosError: true,
            response: {
                data: {
                    username: ["Username already taken!"],
                    email: ["Email already taken!"]
                },
                status: 400,
            },
        });

        const userInput = screen.getByPlaceholderText(/user/i);
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password")
        const submitButton = screen.getByRole("button", { name: /register/i });

        await UserEvent.type(userInput, "testuser");
        await UserEvent.type(emailInput, "test@example.com");
        await UserEvent.type(passwordInput, "Password123#");
        await UserEvent.type(confirmPasswordInput, "Password123#");
        await UserEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Username already taken!")).toBeInTheDocument();
            expect(screen.getByText("Email already taken!")).toBeInTheDocument();
        });
    });
});

describe('useRegisterForm Hook', () => {

    test('initializes with correct initial state', () => {
        const { result } = renderHook(() => useRegisterForm({ onRegisterSuccess: onRegisterSuccessMock }));

        expect(result.current.formData).toEqual({
            username: '',
            email: '',
            password1: '',
            password2: '',
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.showPasswordCheckList).toBe(false);
        expect(result.current.showPassword1).toBe(false);
        expect(result.current.showPassword2).toBe(false);
        expect(result.current.errors).toEqual({});
    });
});