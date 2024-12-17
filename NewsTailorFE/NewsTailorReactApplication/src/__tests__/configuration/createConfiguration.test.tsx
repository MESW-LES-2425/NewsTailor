import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext.tsx';
import ConfigurationForm from '../../components/configurationForm/ConfigurationForm.tsx';
import userEvent from '@testing-library/user-event';

describe('Render Configuration Form components', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <ConfigurationForm />
                </UserProvider>
            </MemoryRouter>
        );
    });

    test('renders configuration name input correctly', () => {
        expect(screen.getByText('Create your Template')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter template name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter template name')).toHaveAttribute('type', 'text');
    });

    test('renders readingTime component correctly', () => {
        expect(screen.getByText(/Reading Time/i)).toBeInTheDocument();
        expect(screen.getByText('1 min')).toBeInTheDocument();
        expect(screen.getByText('1 hour')).toBeInTheDocument();
        expect(screen.getByRole('slider')).toBeInTheDocument();
        expect(screen.getByText(/5 minutes/i)).toBeInTheDocument();
    });

    test('renders sourceSelection component correctly', () => {
        expect(screen.getByText(/News Sources/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Select a source' })).toBeInTheDocument();
    });

    test('renders timeline selection component correctly', () => {
        expect(screen.getByText('Timeline')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Select a timeline' })).toBeInTheDocument();
    });

    test('renders topic selection component correctly', () => {
        expect(screen.getByText(/Categories/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Select a category' })).toBeInTheDocument();
    });
});

describe('Handles user interaction correctly', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <ConfigurationForm />
                </UserProvider>
            </MemoryRouter>
        );
    });

    test('updates name input correctly', async () => {
        const nameInput = screen.getByPlaceholderText('Enter template name');

        await userEvent.type(nameInput, 'My Template');

        expect(nameInput).toHaveValue('My Template');
    });
});