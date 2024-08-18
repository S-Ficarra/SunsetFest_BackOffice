import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../../components/Users/profile/profile';
import { decodeToken } from 'react-jwt';
import { useUser } from '../../hooks/useUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { BrowserRouter as Router } from 'react-router-dom'; 

jest.mock('react-jwt');
jest.mock('../../hooks/useUser');
jest.mock('react-auth-kit/hooks/useAuthHeader');

describe('Profile Component Tests', () => {

    const mockUser = {
        name: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        role: 'Auteur'
    };

    const mockAdmin = {
        name: 'Doe',
        firstName: 'Jane',
        email: 'jane.doe@example.com',
        role: 'Administrateur'
    };

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should render user profile information correctly', () => {
        decodeToken.mockReturnValue({ sub: '1' });
        useAuthHeader.mockReturnValue('Bearer mockToken');
        useUser.mockReturnValue({ userLogged: mockUser });

        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('Auteur')).toBeInTheDocument();
    });

    it('should render the admin option to add user', () => {
        decodeToken.mockReturnValue({ sub: '2' });
        useAuthHeader.mockReturnValue('Bearer mockToken');
        useUser.mockReturnValue({ userLogged: mockAdmin });

        render(
            <Router>
                <Profile />
            </Router>
        );

        // Flexible matching for the "Add User" button
        expect(screen.getByText(/AJOUTER UN UTILISATEUR/i)).toBeInTheDocument();
    });

    it('should not render the admin option for non-admin users', () => {
        decodeToken.mockReturnValue({ sub: '1' });
        useAuthHeader.mockReturnValue('Bearer mockToken');
        useUser.mockReturnValue({ userLogged: mockUser });

        render(
            <Router>
                <Profile />
            </Router>
        );

        // Ensure "Add User" button is not present for non-admin users
        expect(screen.queryByText(/AJOUTER UN UTILISATEUR/i)).not.toBeInTheDocument();
    });
});
