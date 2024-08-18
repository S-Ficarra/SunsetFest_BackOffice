import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddUser from '../../components/Users/addUser/addUser';
import { CreateUser } from '../../controllers/user.controller';

// Mock the CreateUser function
jest.mock('../../controllers/user.controller');

describe('AddUser Component', () => {
    const authHeader = 'Bearer token';

    describe('Form rendering', () => {
        it('should render the AddUser form with all fields and buttons', () => {
            render(
                <MemoryRouter>
                    <AddUser authHeader={authHeader} />
                </MemoryRouter>
            );

            // Check if all form fields and buttons are rendered
            expect(screen.getByLabelText(/PRENOM/i)).toBeInTheDocument();
            expect(screen.getAllByLabelText(/NOM/i)[0]).toBeInTheDocument();
            expect(screen.getByLabelText(/ADRESSE E-MAIL/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/MOT DE PASSE/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Auteur/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Éditeur/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Administrateur/i)).toBeInTheDocument();
            expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
            expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
        });
    });

    describe('Form submission', () => {
        it('should submit the form and display success message on successful user creation', async () => {
            const mockUser = {
                id: 1,
                firstName: 'John',
                name: 'Doe',
                email: 'john.doe@example.com',
                role: 'Auteur'
            };

            // Mock the CreateUser function to return a resolved promise
            CreateUser.mockResolvedValue(mockUser);

            render(
                <MemoryRouter>
                    <AddUser authHeader={authHeader} />
                </MemoryRouter>
            );

            // Fill the form fields
            fireEvent.change(screen.getByLabelText(/PRENOM/i), { target: { value: 'John' } });
            fireEvent.change(screen.getAllByLabelText(/NOM/i)[0], { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/ADRESSE E-MAIL/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getByLabelText(/MOT DE PASSE/i), { target: { value: 'Password@123' } });
            fireEvent.click(screen.getByLabelText(/Auteur/i));

            // Submit the form
            fireEvent.click(screen.getByText(/Enregistrer/i));

            // Wait for the success message to appear
            await waitFor(() => expect(screen.getByText(/Utilisateur créé avec succès!/i)).toBeInTheDocument());

            // Check if the success message contains the user information
            expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
            expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/Auteur/i)).toBeInTheDocument();
        });
    });

    describe('Form reset', () => {
        it('should reset the form after successful submission and clicking "Ajouter un nouvel utilisateur"', async () => {
            const mockUser = {
                id: 1,
                firstName: 'John',
                name: 'Doe',
                email: 'john.doe@example.com',
                role: 'Auteur'
            };

            // Mock the CreateUser function to return a resolved promise
            CreateUser.mockResolvedValue(mockUser);

            render(
                <MemoryRouter>
                    <AddUser authHeader={authHeader} />
                </MemoryRouter>
            );

            // Fill the form and submit it
            fireEvent.change(screen.getByLabelText(/PRENOM/i), { target: { value: 'John' } });
            fireEvent.change(screen.getAllByLabelText(/NOM/i)[0], { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/ADRESSE E-MAIL/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getByLabelText(/MOT DE PASSE/i), { target: { value: 'Password@123' } });
            fireEvent.click(screen.getByLabelText(/Auteur/i));

            // Submit the form
            fireEvent.click(screen.getByText(/Enregistrer/i));

            // Wait for the success message to appear
            await waitFor(() => expect(screen.getByText(/Utilisateur créé avec succès!/i)).toBeInTheDocument());

            // Click on "Ajouter un nouvel utilisateur" button
            fireEvent.click(screen.getByText(/Ajouter un nouvel utilisateur/i));

            // Check if the form is reset and visible again
            expect(screen.getByLabelText(/PRENOM/i)).toBeInTheDocument();
            expect(screen.getAllByLabelText(/NOM/i)[0]).toBeInTheDocument();
            expect(screen.getByLabelText(/ADRESSE E-MAIL/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/MOT DE PASSE/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Auteur/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Éditeur/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Administrateur/i)).toBeInTheDocument();
        });
    });
});
