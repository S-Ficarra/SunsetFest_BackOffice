import React from 'react';
import { render, screen } from '@testing-library/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useAllStages } from '../../hooks/Facilities/useAllStages';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { decodeToken } from 'react-jwt';
import { useUser } from '../../hooks/useUser';
import { useAllToilets } from '../../hooks/Facilities/useAllToilets';
import { useAllCampings } from '../../hooks/Facilities/useAllCampings';
import { useAllVips } from '../../hooks/Facilities/useAllVips';
import { useAllBars } from '../../hooks/Facilities/useAllBars';
import { useAllRestaurants } from '../../hooks/Facilities/useAllRestaurants';
import { useAllMerchandisings } from '../../hooks/Facilities/useAllMerchandisings';
import FestivalMap from '../../components/Map/festivalMap/festivalMap';

// Mocking necessary modules
jest.mock('react-jwt', () => ({
    decodeToken: jest.fn(),
}));

jest.mock('react-auth-kit/hooks/useAuthHeader', () => jest.fn());

jest.mock('../../hooks/useUser', () => ({
    useUser: jest.fn(),
}));

jest.mock('@vis.gl/react-google-maps', () => ({
    APIProvider: ({ children }) => <>{children}</>,
    Map: ({ children, ...props }) => (
        <div data-testid="mock-map" {...props}>
            {children}
        </div>
    ),
    AdvancedMarker: ({ children, ...props }) => (
        <div data-testid="mock-advanced-marker" {...props}>
            {children}
        </div>
    ),
    Pin: () => <div>Pin</div>,
}));

jest.mock('../../hooks/Facilities/useAllStages', () => ({
    useAllStages: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllToilets', () => ({
    useAllToilets: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllCampings', () => ({
    useAllCampings: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllVips', () => ({
    useAllVips: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllBars', () => ({
    useAllBars: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllRestaurants', () => ({
    useAllRestaurants: jest.fn(),
}));

jest.mock('../../hooks/Facilities/useAllMerchandisings', () => ({
    useAllMerchandisings: jest.fn(),
}));

jest.mock('../../controllers/Facilities/stages.controller', () => ({
    DeleteStage: jest.fn(),
}));

jest.mock('../../controllers/Facilities/toilet.controller', () => ({
    DeleteToilet: jest.fn(),
}));

jest.mock('../../controllers/Facilities/camping.controller', () => ({
    DeleteCamping: jest.fn(),
}));

jest.mock('../../controllers/Facilities/vip.controller', () => ({
    DeleteVip: jest.fn(),
}));

jest.mock('../../controllers/Facilities/bar.controller', () => ({
    DeleteBar: jest.fn(),
}));

jest.mock('../../controllers/Facilities/restaurant.controller', () => ({
    DeleteRestaurant: jest.fn(),
}));

jest.mock('../../controllers/Facilities/merchandising.controller', () => ({
    DeleteMerchandising: jest.fn(),
}));

describe('FestivalMap Component', () => {
    const mockAuthHeader = 'Bearer mockToken';
    const mockUser = { role: 'Administrator' };
    const mockStages = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockToilets = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockCampings = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockVips = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockBars = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockRestaurants = [{ id: '1', lat: 43.727454, lng: 3.749390 }];
    const mockMerchandisings = [{ id: '1', lat: 43.727454, lng: 3.749390 }];

    beforeEach(() => {
        jest.clearAllMocks();
        useAuthHeader.mockReturnValue(mockAuthHeader);
        decodeToken.mockReturnValue({ sub: 'user123' });
        useUser.mockReturnValue({ userLogged: mockUser });
        useAllStages.mockReturnValue({ allStages: mockStages });
        useAllToilets.mockReturnValue({ allToilets: mockToilets });
        useAllCampings.mockReturnValue({ allCampings: mockCampings });
        useAllVips.mockReturnValue({ allVips: mockVips });
        useAllBars.mockReturnValue({ allBars: mockBars });
        useAllRestaurants.mockReturnValue({ allRestaurants: mockRestaurants });
        useAllMerchandisings.mockReturnValue({ allMerchandisings: mockMerchandisings });
    });

    it('should render the map with markers and filters', () => {
        render(<FestivalMap />);

        // Check if the "ADD NEW LOCATION" button is present
        expect(screen.getByText('AJOUTER UN NOUVEAU LIEU')).toBeInTheDocument();
        // Check filters
        expect(screen.getByText('Scènes')).toBeInTheDocument();
        expect(screen.getByText('Toilettes')).toBeInTheDocument();
        expect(screen.getByText('Campings')).toBeInTheDocument();
        expect(screen.getByText('VIP')).toBeInTheDocument();
        expect(screen.getByText('Bars')).toBeInTheDocument();
        expect(screen.getByText('Restaurants')).toBeInTheDocument();
        expect(screen.getByText('Marchandises')).toBeInTheDocument();

    });
});
