import { BandService } from '../../services/band.service';
import { BandDto } from '../../dto/band.dto';

// Mock fetch for tests
global.fetch = jest.fn();

describe('BandService', () => {
    const authHeader = 'Bearer test-token';
    
    describe('fetchAllBands', () => {
        it('should fetch all bands and return an array of BandDto', async () => {
            const mockBands = [
                { _id: '1', _name: 'Band One', _country: 'USA', _text: 'First band', _socials: [], _thumbnailImage: 'thumb1.jpg', _bannerImage: 'banner1.jpg', _user: 'user1', _createdAt: '2023-01-01', _modifiedAt: '2023-01-02' },
                { _id: '2', _name: 'Band Two', _country: 'UK', _text: 'Second band', _socials: [], _thumbnailImage: 'thumb2.jpg', _bannerImage: 'banner2.jpg', _user: 'user2', _createdAt: '2023-01-03', _modifiedAt: '2023-01-04' }
            ];
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockBands
            });

            const bands = await BandService.fetchAllBands(authHeader);          
            
            expect(bands).toHaveLength(2);
            expect(bands[0]).toBeInstanceOf(BandDto);
            expect(bands[0]._id).toBe('1');
            expect(bands[1]._name).toBe('Band Two');
        });
    });

    describe('fetchBand', () => {
        it('should fetch a single band and return a BandDto', async () => {
            const mockBand = { _id: '1', _name: 'Band One', _country: 'USA', _text: 'First band', _socials: [], _thumbnailImage: 'thumb1.jpg', _bannerImage: 'banner1.jpg', _user: 'user1', _createdAt: '2023-01-01', _modifiedAt: '2023-01-02' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockBand
            });

            const band = await BandService.fetchBand(authHeader, '1');

            expect(band).toBeInstanceOf(BandDto);
            expect(band._id).toBe('1');
            expect(band._name).toBe('Band One');
        });
    });

    describe('createBand', () => {
        it('should create a band and return the response and data', async () => {
            const newBand = { _name: 'Band One', _country: 'USA', _text: 'First band', _socials: [], _thumbnailImage: 'thumb1.jpg', _bannerImage: 'banner1.jpg', _user: 'user1' };
            const mockResponse = { _id: '1', ...newBand };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await BandService.createBand(authHeader, JSON.stringify(newBand));

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('editBand', () => {
        it('should edit a band and return the response and data', async () => {
            const bandEdited = { _name: 'Updated Band', _country: 'USA', _text: 'Updated text', _socials: [], _thumbnailImage: 'thumb1.jpg', _bannerImage: 'banner1.jpg', _user: 'user1' };
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await BandService.editBand(authHeader, '1', JSON.stringify(bandEdited));

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('deleteBand', () => {
        it('should delete a band and return the response and data', async () => {
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await BandService.deleteBand(authHeader, '1');

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });
});
