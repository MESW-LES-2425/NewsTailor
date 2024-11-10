import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import LoginForm from "../../components/loginForm/LoginForm.tsx";
import {MemoryRouter} from "react-router-dom";
import UserEvent from "@testing-library/user-event";

describe('LoginForm', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
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
});