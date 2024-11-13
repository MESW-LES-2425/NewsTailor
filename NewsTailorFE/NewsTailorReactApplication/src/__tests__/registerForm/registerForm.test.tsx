import '@testing-library/jest-dom';
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import RegisterForm from "../../components/registerForm/RegisterForm.tsx";
import UserEvent from "@testing-library/user-event";

describe('RegisterForm', () => {
    const mockOnRegisterSuccess = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <RegisterForm onRegisterSuccess={mockOnRegisterSuccess} />
            </MemoryRouter>
        );
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
});