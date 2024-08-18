import { FaqsDto } from '../../dto/Publications/faqs.dto';
import { FaqsService } from '../../services/Publications/faqs.service';

// Mock fetch for tests
global.fetch = jest.fn();

describe('FaqsService', () => {
    const authHeader = 'Bearer test-token';
    
    describe('fetchAllFaqs', () => {
        it('should fetch all FAQs and return an array of FaqsDto', async () => {
            const mockFaqs = [
                { _id: '1', _user: 'user1', _createdAt: '2024-01-01', _modifiedAt: '2024-01-02', _status: 'active', _type: 'general', _question: 'Question 1', _answer: 'Answer 1' },
                { _id: '2', _user: 'user2', _createdAt: '2024-01-03', _modifiedAt: '2024-01-04', _status: 'inactive', _type: 'technical', _question: 'Question 2', _answer: 'Answer 2' }
            ];
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockFaqs
            });

            const faqs = await FaqsService.fetchAllFaqs(authHeader);
            
            expect(faqs).toHaveLength(2);
            expect(faqs[0]).toBeInstanceOf(FaqsDto);
            expect(faqs[0]._id).toBe('1');
            expect(faqs[1]._question).toBe('Question 2');
        });

        it('should return status and data for non-200 responses', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                json: async () => ({})
            });

            const result = await FaqsService.fetchAllFaqs(authHeader);

            expect(result.response.status).toBe(404);
            expect(result.data).toEqual({});
        });
    });

    describe('fetchFaq', () => {
        it('should fetch a single FAQ and return a FaqsDto', async () => {
            const mockFaq = { _id: '1', _user: 'user1', _createdAt: '2024-01-01', _modifiedAt: '2024-01-02', _status: 'active', _type: 'general', _question: 'Question 1', _answer: 'Answer 1' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockFaq
            });

            const faq = await FaqsService.fetchFaq(authHeader, '1');

            expect(faq).toBeInstanceOf(FaqsDto);
            expect(faq._id).toBe('1');
            expect(faq._question).toBe('Question 1');
        });

        it('should return status text for non-200 responses', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                statusText: 'Not Found',
                json: async () => ({})
            });

            const result = await FaqsService.fetchFaq(authHeader, '1');

            expect(result).toBe('Not Found');
        });
    });

    describe('createFaq', () => {
        it('should create a FAQ and return the response and data', async () => {
            const newFaq = { user: 'user1', createdAt: '2024-01-01', modifiedAt: '2024-01-02', status: 'active', type: 'general', question: 'Question 1', answer: 'Answer 1' };
            const mockResponse = { _id: '1', ...newFaq };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await FaqsService.createFaq(authHeader, newFaq);

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('editFaq', () => {
        it('should edit a FAQ and return the response and data', async () => {
            const faqEdited = { user: 'user1', createdAt: '2024-01-01', modifiedAt: '2024-01-02', status: 'active', type: 'general', question: 'Question 1 edited', answer: 'Answer 1 edited' };
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await FaqsService.editFaq(authHeader, '1', faqEdited);

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('deleteFaq', () => {
        it('should delete a FAQ and return the response and data', async () => {
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await FaqsService.deleteFaq(authHeader, '1');

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });
});
