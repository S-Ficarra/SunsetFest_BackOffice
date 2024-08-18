import { GetAllFaqs, GetFaq, CreateFaq, EditFaq, DeleteFaq } from '../../controllers/Publications/faqs.controller';
import { FaqsService } from '../../services/Publications/faqs.service';
import { FaqsMapper } from '../../mappers/Publications/faqs.mapper';

// Mock dependencies
jest.mock('../../services/Publications/faqs.service');
jest.mock('../../mappers/Publications/faqs.mapper');

describe('Faqs Controller Tests', () => {

    const mockAuthHeader = 'Bearer mockToken';
    
    // Mock data
    const mockFaqDto = { _id: '1', _user: 'user1', _createdAt: '2024-01-01', _modifiedAt: '2024-01-02', _status: 'active', _type: 'general', _question: 'Question 1', _answer: 'Answer 1' };
    const mockFaqModel = { id: '1', user: 'user1', createdAt: '2024-01-01', modifiedAt: '2024-01-02', status: 'active', type: 'general', question: 'Question 1', answer: 'Answer 1' };
    const mockNewFaqDto = { user: 'user1', createdAt: '2024-01-01', modifiedAt: '2024-01-02', status: 'active', type: 'general', question: 'Question 1', answer: 'Answer 1' };
    
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    // Test GetAllFaqs
    it('should fetch and transform all FAQs', async () => {
        // Mock service responses
        FaqsService.fetchAllFaqs.mockResolvedValue([mockFaqDto]);
        FaqsMapper.transformFaqsDtoToModel.mockReturnValue(mockFaqModel);

        const result = await GetAllFaqs(mockAuthHeader);

        expect(FaqsService.fetchAllFaqs).toHaveBeenCalledWith(mockAuthHeader);
        expect(FaqsMapper.transformFaqsDtoToModel).toHaveBeenCalledWith(mockFaqDto);
        expect(result).toEqual([mockFaqModel]);
    });

    // Test GetFaq
    it('should fetch and transform a single FAQ', async () => {
        FaqsService.fetchFaq.mockResolvedValue(mockFaqDto);
        FaqsMapper.transformFaqsDtoToModel.mockReturnValue(mockFaqModel);

        const result = await GetFaq(mockAuthHeader, '1');

        expect(FaqsService.fetchFaq).toHaveBeenCalledWith(mockAuthHeader, '1');
        expect(FaqsMapper.transformFaqsDtoToModel).toHaveBeenCalledWith(mockFaqDto);
        expect(result).toEqual(mockFaqModel);
    });

    // Test CreateFaq
    it('should create an FAQ and return the transformed model', async () => {
        const mockResponse = { status: 200 };
        const mockData = mockFaqDto;

        FaqsService.createFaq.mockResolvedValue({ response: mockResponse, data: mockData });
        FaqsMapper.transformFaqsDtoToModel.mockReturnValue(mockFaqModel);

        const result = await CreateFaq(mockAuthHeader, mockNewFaqDto);

        expect(FaqsService.createFaq).toHaveBeenCalledWith(mockAuthHeader, mockNewFaqDto);
        expect(FaqsMapper.transformFaqsDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockFaqModel);
    });

    // Test EditFaq
    it('should edit an FAQ and return the transformed model', async () => {
        const mockResponse = { status: 200 };
        const mockData = mockFaqDto;
        const mockEditedFaqDto = { ...mockNewFaqDto, question: 'Updated Question' };

        FaqsService.editFaq.mockResolvedValue({ response: mockResponse, data: mockData });
        FaqsMapper.transformFaqsDtoToModel.mockReturnValue(mockFaqModel);

        const result = await EditFaq(mockAuthHeader, mockEditedFaqDto, '1');

        expect(FaqsService.editFaq).toHaveBeenCalledWith(mockAuthHeader, '1', mockEditedFaqDto);
        expect(FaqsMapper.transformFaqsDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockFaqModel);
    });

    // Test DeleteFaq
    it('should delete an FAQ and return the response data', async () => {
        const mockResponse = { status: 200 };
        const mockData = { message: 'FAQ deleted successfully' };

        FaqsService.deleteFaq.mockResolvedValue({ response: mockResponse, data: mockData });

        const result = await DeleteFaq(mockAuthHeader, '1');

        expect(FaqsService.deleteFaq).toHaveBeenCalledWith(mockAuthHeader, '1');
        expect(result).toEqual(mockData);
    });

    // Test Error Handling in CreateFaq
    it('should throw an error if createFaq fails', async () => {
        const mockResponse = { status: 400 };
        const mockData = { message: 'FAQ creation failed' };

        FaqsService.createFaq.mockResolvedValue({ response: mockResponse, data: mockData });

        await expect(CreateFaq(mockAuthHeader, mockNewFaqDto))
            .rejects
            .toThrow('FAQ creation failed');
    });

    // Test Error Handling in EditFaq
    it('should throw an error if editFaq fails', async () => {
        const mockResponse = { status: 400 };
        const mockData = { message: 'FAQ update failed' };
        const mockEditedFaqDto = { ...mockNewFaqDto, question: 'Updated Question' };

        FaqsService.editFaq.mockResolvedValue({ response: mockResponse, data: mockData });

        await expect(EditFaq(mockAuthHeader, mockEditedFaqDto, '1'))
            .rejects
            .toThrow('FAQ update failed Status code: 400 ');
    });

    // Test Error Handling in DeleteFaq
    it('should throw an error if deleteFaq fails', async () => {
        const mockResponse = { status: 400 };
        const mockData = { message: 'FAQ deletion failed' };

        FaqsService.deleteFaq.mockResolvedValue({ response: mockResponse, data: mockData });

        await expect(DeleteFaq(mockAuthHeader, '1'))
            .rejects
            .toThrow('FAQ deletion failed Status code: 400 ');
    });
});
