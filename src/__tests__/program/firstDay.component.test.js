import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { decodeToken } from 'react-jwt';
import { DeletePerformanceFromProgram } from '../../controllers/program.controller';
import { useUser } from '../../hooks/useUser';
import FirstDay from '../../components/Program/firstDay/firstDay';

// Mock the necessary modules
jest.mock('react-auth-kit/hooks/useAuthHeader', () => jest.fn());
jest.mock('react-jwt', () => ({
    decodeToken: jest.fn(),
}));
jest.mock('../../hooks/useUser', () => ({
    useUser: jest.fn(),
}));
jest.mock('../../controllers/program.controller', () => ({
    DeletePerformanceFromProgram: jest.fn(),
}));

describe('FirstDay Component', () => {
    const mockAuthHeader = 'Bearer mockToken';
    const mockUser = { role: 'Administrateur' };
    const mockPerformances = [
        { 
            _id: '1', _band: { _name: 'Band 1' }, _stage: { _id: '1' }, 
            _timeFrame: { _startingTime: '2023-08-18T14:00:00Z' }
        },
        { 
            _id: '2', _band: { _name: 'Band 2' }, _stage: { _id: '2' }, 
            _timeFrame: { _startingTime: '2023-08-18T16:00:00Z' }
        },
        { 
            _id: '3', _band: { _name: 'Band 3' }, _stage: { _id: '3' }, 
            _timeFrame: { _startingTime: '2023-08-18T18:00:00Z' }
        },
        { 
            _id: '4', _band: { _name: 'Band 4' }, _stage: { _id: '4' }, 
            _timeFrame: { _startingTime: '2023-08-18T20:00:00Z' }
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthHeader.mockReturnValue(mockAuthHeader);
        decodeToken.mockReturnValue({ sub: 'user123' });
        useUser.mockReturnValue({ userLogged: mockUser });
    });

    const renderWithRouter = (ui) => {
        return render(
            <Router>
                {ui}
            </Router>
        );
    };

    it('should display performance details for each stage and time', () => {
        renderWithRouter(<FirstDay performances={mockPerformances} />);

        expect(screen.getByText('Band 1')).toBeInTheDocument();
        expect(screen.getByText('Band 2')).toBeInTheDocument();
        expect(screen.getByText('Band 3')).toBeInTheDocument();
        expect(screen.getByText('Band 4')).toBeInTheDocument();

        expect(screen.getByText(/ROXY/)).toBeInTheDocument();
        expect(screen.getByText(/RAINBOW/)).toBeInTheDocument();
        expect(screen.getByText(/WHISKEY/)).toBeInTheDocument();
        expect(screen.getByText(/VIPER/)).toBeInTheDocument();

        expect(screen.getByText('14H')).toBeInTheDocument();
        expect(screen.getByText('16H')).toBeInTheDocument();
        expect(screen.getByText('18H')).toBeInTheDocument();
        expect(screen.getByText('20H')).toBeInTheDocument();
        expect(screen.getByText('22H')).toBeInTheDocument();
    });

    it('should display delete buttons for admin or editor users', () => {
        renderWithRouter(<FirstDay performances={mockPerformances} />);

        expect(screen.getAllByText('Supprimer du programme')).toHaveLength(4);
    });
});
