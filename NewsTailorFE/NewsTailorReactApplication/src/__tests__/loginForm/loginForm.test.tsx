import '@testing-library/jest-dom';
import {render, renderHook, screen, waitFor} from "@testing-library/react";
import LoginForm from "../../components/loginForm/LoginForm.tsx";
import {MemoryRouter, useNavigate} from "react-router-dom";
import UserEvent, {userEvent} from "@testing-library/user-event";
import api from "../../api.ts";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants.ts";
import useLoginForm from "../../components/loginForm/useLoginForm.ts";

jest.mock("../../api.ts");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const localStorageMock = (() => {
    const store: Record<string, string> = {};
    return {
        setItem: jest.fn((key, value) => {
            store[key] = value;
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

describe('LoginForm', () => {
    const navigate = jest.fn();
    const mockedApi = api as jest.Mocked<typeof api>;
    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form correctly', () => {
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password')
        expect(screen.getByTestId('toggle-password-icon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText('Or Sign in with social platforms')).toBeInTheDocument();
        expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
        expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
        expect(screen.getByTestId('google-icon')).toBeInTheDocument();
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    });

    test('login fields can receive input', async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        await UserEvent.type(emailInput, 'test@example.com');
        await UserEvent.type(passwordInput, 'password123');
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    })

    test('toggle password visibility on icon click', async () => {
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const toggleIcon = screen.getByTestId('toggle-password-icon');

        await UserEvent.click(toggleIcon);
        expect(passwordInput).toHaveAttribute('type', 'text');
        await UserEvent.click(toggleIcon);
        expect(passwordInput).toHaveAttribute('type', 'password');
    })

    test("submits form, logs in, retrieves tokens, and navigates", async () => {
        mockedApi.post
            .mockResolvedValueOnce({ data: { id: 1 , tokens:{access:"access_token", refresh:"refresh_token" }} })

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(api.post).toHaveBeenNthCalledWith(1, "/api/login/", {
                email: "test@example.com",
                password: "password123",
            });

            expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, "access_token");
            expect(localStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, "refresh_token");

            expect(navigate).toHaveBeenCalledWith("/", { state: { userId: 1 } });
        });
    });

    test("submits form with invalid credentials, catches errors, and displays error message", async () => {

        mockedApi.post.mockRejectedValueOnce({
            isAxiosError: true,
            response: {
                data: {
                    non_field_error: "Incorrect Credentials!",
                },
                status: 400,
            },
        });

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        await userEvent.type(emailInput, "wrong@example.com");
        await userEvent.type(passwordInput, "wrongpassword");
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith("/api/login/", {
                email: "wrong@example.com",
                password: "wrongpassword",
            });

            expect(screen.getByText("Incorrect Credentials!")).toBeInTheDocument();
        });
    });

    test("submits form with invalid email, catches errors, and displays error message", async () => {

        mockedApi.post.mockRejectedValueOnce({
            isAxiosError: true,
            response: {
                data: {
                    email: "User not Found!",
                },
                status: 400,
            },
        });

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        await userEvent.type(emailInput, "notfound@example.com");
        await userEvent.type(passwordInput, "wrongpassword");
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("User not Found!")).toBeInTheDocument();
        });
    });
});

describe('useLoginForm Hook', () => {

    test('initializes with correct initial state', () => {
        const { result } = renderHook(() => useLoginForm());
        expect(result.current.formData).toEqual({ email: '', password: '' });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.showPassword).toBe(false);
        expect(result.current.errors).toEqual({});
    });
});
