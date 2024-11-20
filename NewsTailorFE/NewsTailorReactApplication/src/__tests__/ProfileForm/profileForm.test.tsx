import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfileForm from '../../components/profile/ProfileForm';
import useProfileForm from '../../components/profile/useProfileForm';
import { UserProvider } from "../../context/UserContext.tsx";

jest.mock('../../components/profile/useProfileForm');

const mockUseProfileForm = useProfileForm as jest.MockedFunction<typeof useProfileForm>;

it('renders ProfileForm with user data', () => {
    mockUseProfileForm.mockReturnValue({
        userId: '123',
        isEditing: false,
        username: 'testuser',
        email: 'testuser@example.com',
        handleEditClick: jest.fn(),
        handleInputChange: jest.fn(),
        handleSubmit: jest.fn(),
        wpm: 100,
        wpmString: "100",
        handleDeleteAccount: jest.fn(),
    });

    render(
        <MemoryRouter initialEntries={[{ pathname: '/profile', state: { userId: '123' } }]}>
            <UserProvider>
                <Routes>
                    <Route path="/profile" element={<ProfileForm />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>
    );

    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
    expect(screen.getAllByText(/testuser/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/testuser@example.com/i)[0]).toBeInTheDocument();
});

it('renders ProfileForm in editing mode', () => {
    mockUseProfileForm.mockReturnValue({
        userId: '123',
        isEditing: true,
        username: 'testuser',
        email: 'testuser@example.com',
        handleEditClick: jest.fn(),
        handleInputChange: jest.fn(),
        handleSubmit: jest.fn(),
        wpm: 100,
        wpmString: "100",
        handleDeleteAccount: jest.fn(),
    });

    render(
        <MemoryRouter initialEntries={[{ pathname: '/profile', state: { userId: '123' } }]}>
            <UserProvider>
                <Routes>
                    <Route path="/profile" element={<ProfileForm />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>
    );

    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getAllByDisplayValue(/testuser/i)[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue(/testuser@example.com/i)[0]).toBeInTheDocument();
});

it('handles edit button click', () => {
    const handleEditClick = jest.fn();
    mockUseProfileForm.mockReturnValue({
        userId: '123',
        isEditing: false,
        username: 'testuser',
        email: 'testuser@example.com',
        handleEditClick,
        handleInputChange: jest.fn(),
        handleSubmit: jest.fn(),
        wpm: 100,
        wpmString: "100",
        handleDeleteAccount: jest.fn(),
    });

    render(
        <MemoryRouter initialEntries={[{ pathname: '/profile', state: { userId: '123' } }]}>
            <UserProvider>
                <Routes>
                    <Route path="/profile" element={<ProfileForm />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(handleEditClick).toHaveBeenCalled();
});

it('handles form submission', () => {
    const handleSubmit = jest.fn();
    mockUseProfileForm.mockReturnValue({
        userId: '123',
        isEditing: true,
        username: 'testuser',
        email: 'testuser@example.com',
        handleEditClick: jest.fn(),
        handleInputChange: jest.fn(),
        handleSubmit,
        wpm: 100,
        wpmString: "100",
        handleDeleteAccount: jest.fn(),
    });

    render(
        <MemoryRouter initialEntries={[{ pathname: '/profile', state: { userId: '123' } }]}>
            <UserProvider>
                <Routes>
                    <Route path="/profile" element={<ProfileForm />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalled();
});
