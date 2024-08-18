import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { decodeToken } from 'react-jwt';
import { DeleteUser } from '../../controllers/user.controller';
import { useUser } from '../../hooks/useUser';
import { useAllUsers } from '../../hooks/useAllUsers';
import AllUsers from '../../components/Users/allUsers/allUsers';
import Pen from '../../assets/pen-solid.svg';
import Trash from '../../assets/trash-solid.svg';

// Mock the necessary modules
jest.mock('react-auth-kit/hooks/useAuthHeader', () => jest.fn());
jest.mock('react-jwt', () => ({
    decodeToken: jest.fn(),
}));
jest.mock('../../hooks/useUser', () => ({
    useUser: jest.fn(),
}));
jest.mock('../../hooks/useAllUsers', () => ({
    useAllUsers: jest.fn(),
}));
jest.mock('../../controllers/user.controller', () => ({
    DeleteUser: jest.fn(),
}));

describe('AllUsers Component', () => {
    const mockAuthHeader = 'Bearer mockToken';
    const mockUser = { role: 'Administrateur' };
    const mockUsers = [
        { id: 1, firstName: 'John', name: 'Doe', email: 'john.doe@example.com', role: 'User' },
        { id: 2, firstName: 'Jane', name: 'Smith', email: 'jane.smith@example.com', role: 'Admin' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthHeader.mockReturnValue(mockAuthHeader);
        decodeToken.mockReturnValue({ sub: 'user123' });
        useUser.mockReturnValue({ userLogged: mockUser });
        useAllUsers.mockReturnValue({ allUsers: mockUsers });
    });

    const renderWithRouter = (ui) => {
        return render(
            <Router>
                {ui}
            </Router>
        );
    };

    it('should display a list of users when users are available', () => {
        renderWithRouter(<AllUsers />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('should show edit and delete buttons for admin users', () => {
        renderWithRouter(<AllUsers />);

        expect(screen.getAllByText('Modifier')).toHaveLength(2);
        expect(screen.getAllByText('Supprimer')).toHaveLength(2);
    });
});
