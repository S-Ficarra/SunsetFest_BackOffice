import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { DeleteFaq } from '../../controllers/Publications/faqs.controller';
import { useUser } from '../../hooks/useUser';
import { formatDate } from '../../services/utils';
import { useAllFaqs } from '../../hooks/Publications/useAllFaqs';
import AllFaqs from '../../components/Publications/FAQS/allFaqs/allFaqs';

// Mock the necessary modules
jest.mock('react-jwt', () => ({
    decodeToken: jest.fn(),
}));

jest.mock('react-auth-kit/hooks/useAuthHeader', () => jest.fn());

jest.mock('../../hooks/useUser', () => ({
    useUser: jest.fn(),
}));

jest.mock('../../hooks/Publications/useAllFaqs', () => ({
    useAllFaqs: jest.fn(),
}));

jest.mock('../../controllers/Publications/faqs.controller', () => ({
    DeleteFaq: jest.fn(),
}));

describe('AllFaqs Component', () => {
    const mockAuthHeader = 'Bearer mockToken';
    const mockUser = { role: 'Administrateur' };
    const mockFaqs = [
        { id: 1, question: 'Question 1', answer: '<p>Answer 1</p>', status: true, userName: 'User 1', createdAt: '2024-01-01T00:00:00Z', modifiedAt: '2024-01-02T00:00:00Z' },
        { id: 2, question: 'Question 2', answer: '<p>Answer 2</p>', status: false, userName: 'User 2', createdAt: '2024-01-03T00:00:00Z', modifiedAt: '2024-01-04T00:00:00Z' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthHeader.mockReturnValue(mockAuthHeader);
        decodeToken.mockReturnValue({ sub: 'user123' });
        useUser.mockReturnValue({ userLogged: mockUser });
        useAllFaqs.mockReturnValue({ allFaqs: mockFaqs });
    });

    const renderWithRouter = (ui) => {
        return render(
            <Router>
                {ui}
            </Router>
        );
    };

    it('should display a message when no FAQs are available', () => {
        useAllFaqs.mockReturnValue({ allFaqs: [] });

        renderWithRouter(<AllFaqs />);

        expect(screen.getByText("Il n'y a aucune FAQ pour le moment")).toBeInTheDocument();
        expect(screen.getByText("AJOUTER UNE NOUVELLE FAQ")).toBeInTheDocument();
    });

    it('should display a list of FAQs when FAQs are available', () => {
        renderWithRouter(<AllFaqs />);

        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByText('Question 2')).toBeInTheDocument();
        expect(screen.getByText('Publié')).toBeInTheDocument();
        expect(screen.getByText('Non Publié')).toBeInTheDocument();
    });

    it('should show edit and delete buttons for admin or editor users', () => {
        renderWithRouter(<AllFaqs />);

        expect(screen.getAllByText('Modifier')).toHaveLength(2);
        expect(screen.getAllByText('Supprimer')).toHaveLength(2);
    });
});
