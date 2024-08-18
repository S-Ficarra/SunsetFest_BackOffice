import { GetAllBands, GetBand, CreateBand, EditBand, DeleteBand } from '../../controllers/band.controller';
import { BandService } from '../../services/band.service';
import { BandMapper } from '../../mappers/band.mapper';

// Mock dependencies
jest.mock('../../services/band.service');
jest.mock('../../mappers/band.mapper');

describe('Band Controller Tests', () => {

    const mockAuthHeader = 'Bearer mockToken';

    // Mock data
    const mockBandDto = { id: 1, name: 'Band One', country: 'USA', text: 'First band', socials: [], thumbnailImage: 'thumb1.jpg', bannerImage: 'banner1.jpg', user: 'user1', createdAt: '2023-01-01', modifiedAt: '2023-01-02' };
    const mockBandModel = { id: 1, name: 'Band One', country: 'USA', text: 'First band', socials: [], thumbnailImage: 'thumb1.jpg', bannerImage: 'banner1.jpg', user: 'user1' };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    // Test GetAllBands
    it('should fetch and transform all bands', async () => {
        // Mock service responses
        BandService.fetchAllBands.mockResolvedValue([mockBandDto]);
        BandMapper.transformBandDtoToModel.mockReturnValue(mockBandModel);

        const result = await GetAllBands(mockAuthHeader);

        expect(BandService.fetchAllBands).toHaveBeenCalledWith(mockAuthHeader);
        expect(BandMapper.transformBandDtoToModel).toHaveBeenCalledWith(mockBandDto);
        expect(result).toEqual([mockBandModel]);
    });

    // Test GetBand
    it('should fetch and transform a single band', async () => {
        BandService.fetchBand.mockResolvedValue(mockBandDto);
        BandMapper.transformBandDtoToModel.mockReturnValue(mockBandModel);

        const result = await GetBand(mockAuthHeader, 1);

        expect(BandService.fetchBand).toHaveBeenCalledWith(mockAuthHeader, 1);
        expect(BandMapper.transformBandDtoToModel).toHaveBeenCalledWith(mockBandDto);
        expect(result).toEqual(mockBandModel);
    });

    // Test CreateBand
    it('should create a band and return the transformed model', async () => {
        const mockNewBandDto = { name: 'Band One', country: 'USA', text: 'First band', socials: [], thumbnailImage: 'thumb1.jpg', bannerImage: 'banner1.jpg', user: 'user1' };
        const mockResponse = { status: 200 };
        const mockData = mockBandDto;

        BandService.createBand.mockResolvedValue({ response: mockResponse, data: mockData });
        BandMapper.transformBandDtoToModel.mockReturnValue(mockBandModel);

        const result = await CreateBand(mockAuthHeader, mockNewBandDto);

        expect(BandService.createBand).toHaveBeenCalledWith(mockAuthHeader, mockNewBandDto);
        expect(BandMapper.transformBandDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockBandModel);
    });

    // Test EditBand
    it('should edit a band and return the transformed model', async () => {
        const mockEditedBandDto = { name: 'Updated Band', country: 'USA', text: 'Updated text', socials: [], thumbnailImage: 'thumb1.jpg', bannerImage: 'banner1.jpg', user: 'user1' };
        const mockResponse = { status: 200 };
        const mockData = mockBandDto;

        BandService.editBand.mockResolvedValue({ response: mockResponse, data: mockData });
        BandMapper.transformBandDtoToModel.mockReturnValue(mockBandModel);

        const result = await EditBand(mockAuthHeader, mockEditedBandDto, 1);

        expect(BandService.editBand).toHaveBeenCalledWith(mockAuthHeader, 1, mockEditedBandDto);
        expect(BandMapper.transformBandDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockBandModel);
    });

    // Test DeleteBand
    it('should delete a band and return the response data', async () => {
        const mockResponse = { status: 200 };
        const mockData = { message: 'Band deleted successfully' };

        BandService.deleteBand.mockResolvedValue({ response: mockResponse, data: mockData });

        const result = await DeleteBand(mockAuthHeader, 1);

        expect(BandService.deleteBand).toHaveBeenCalledWith(mockAuthHeader, 1);
        expect(result).toEqual(mockData);
    });

    // Test Error Handling in CreateBand
    it('should throw an error if createBand fails', async () => {
        const mockNewBandDto = { name: 'Band One', country: 'USA', text: 'First band', socials: [], thumbnailImage: 'thumb1.jpg', bannerImage: 'banner1.jpg', user: 'user1' };
        const mockResponse = { status: 400 };
        const mockData = { message: 'Band creation failed' };

        BandService.createBand.mockResolvedValue({ response: mockResponse, data: mockData });

        await expect(CreateBand(mockAuthHeader, mockNewBandDto))
            .rejects
            .toThrow('Band creation failed');
    });
});
