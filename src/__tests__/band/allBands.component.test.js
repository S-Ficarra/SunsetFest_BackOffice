import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { decodeToken } from 'react-jwt';
import { DeleteBand } from '../../controllers/band.controller';
import { useUser } from '../../hooks/useUser';
import { convertToBase64 } from '../../services/utils';
import { useAllBands } from '../../hooks/useAllBands';
import AllBands from '../../components/Bands/allBands/allBands';

// Mock the necessary modules
jest.mock('react-auth-kit/hooks/useAuthHeader', () => jest.fn());
jest.mock('react-jwt', () => ({
    decodeToken: jest.fn(),
}));
jest.mock('../../hooks/useUser', () => ({
    useUser: jest.fn(),
}));
jest.mock('../../hooks/useAllBands', () => ({
    useAllBands: jest.fn(),
}));
jest.mock('../../controllers/band.controller', () => ({
    DeleteBand: jest.fn(),
}));
jest.mock('../../services/utils', () => ({
    convertToBase64: jest.fn(),
}));

describe('AllBands Component', () => {
    const mockAuthHeader = 'Bearer mockToken';
    const mockUser = { role: 'Administrateur' };
    const mockBands = [
        { id: 1, name: 'Band 1', thumbnailImage: 'image1.png' },
        { id: 2, name: 'Band 2', thumbnailImage: 'image2.png' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthHeader.mockReturnValue(mockAuthHeader);
        decodeToken.mockReturnValue({ sub: 'user123' });
        useUser.mockReturnValue({ userLogged: mockUser });
        useAllBands.mockReturnValue({ allBands: mockBands });
        convertToBase64.mockImplementation(image => `data:image/png;base64,${image}`);
    });

    const renderWithRouter = (ui) => {
        return render(
            <Router>
                {ui}
            </Router>
        );
    };

    it('should display a message when no bands are available', () => {
        useAllBands.mockReturnValue({ allBands: [] });

        renderWithRouter(<AllBands />);

        expect(screen.getByText("Il n'y a aucun Groupe pour le moment")).toBeInTheDocument();
        expect(screen.getByText("AJOUTER UN NOUVEAU GROUPE")).toBeInTheDocument();
    });

    it('should display a list of bands when bands are available', () => {
        renderWithRouter(<AllBands />);

        expect(screen.getByText('Band 1')).toBeInTheDocument();
        expect(screen.getByText('Band 2')).toBeInTheDocument();
    });

    it('should show edit and delete buttons for admin or editor users', () => {
        renderWithRouter(<AllBands />);

        expect(screen.getAllByText('Modifier')).toHaveLength(2);
        expect(screen.getAllByText('Supprimer')).toHaveLength(2);
    });
});
