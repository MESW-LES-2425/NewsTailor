import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRoute from '../../components/AdminRoute';
import * as authUtils from '../../utils/authUtils';

// Mock components to simplify tests
const MockAdminPage = () => <div>Admin Page</div>;
const MockForbiddenPage = () => <div>Forbidden Page</div>;

// Mock the authUtils module
jest.mock('../../utils/authUtils');
const mockCheckAuthStatus = authUtils.checkAuthStatus as jest.Mock;

describe('AdminRoute', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('redirects to ForbiddenPage when username is not admin', async () => {
        // Mock user as authenticated but not admin
        mockCheckAuthStatus.mockResolvedValue(true);
        localStorage.setItem('user_info', JSON.stringify({ username: 'user' }));

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route
                        path="/admin"
                        element={<AdminRoute><MockAdminPage /></AdminRoute>}
                    />
                    <Route path="/forbidden" element={<MockForbiddenPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Forbidden Page')).toBeInTheDocument());
    });
});
