import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/user.dto';

// Mock fetch for tests
global.fetch = jest.fn();

describe('UserService', () => {
    const authHeader = 'Bearer test-token';
    
    describe('fetchAllUsers', () => {
        it('should fetch all users and return an array of UserDto', async () => {
            const mockUsers = [
                { _id: '1', _name: 'Doe', _firstName: 'John', _email: 'john.doe@example.com', _role: 'admin' },
                { _id: '2', _name: 'Smith', _firstName: 'Jane', _email: 'jane.smith@example.com', _role: 'user' }
            ];
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockUsers
            });

            const users = await UserService.fetchAllUsers(authHeader);
            
            expect(users).toHaveLength(2);
            expect(users[0]).toBeInstanceOf(UserDto);
            expect(users[0]._id).toBe('1');
            expect(users[1]._email).toBe('jane.smith@example.com');
        });

        it('should return status text for non-200 responses', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                statusText: 'Not Found'
            });

            const result = await UserService.fetchAllUsers(authHeader);

            expect(result).toBe('Not Found');
        });
    });

    describe('fetchUser', () => {
        it('should fetch a single user and return a UserDto', async () => {
            const mockUser = { _id: '1', _name: 'Doe', _firstName: 'John', _email: 'john.doe@example.com', _role: 'admin' };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockUser
            });

            const user = await UserService.fetchUser(authHeader, '1');

            expect(user).toBeInstanceOf(UserDto);
            expect(user._id).toBe('1');
            expect(user._name).toBe('Doe');
        });

        it('should return status text for non-200 responses', async () => {
            global.fetch.mockResolvedValueOnce({
                status: 404,
                statusText: 'Not Found'
            });

            const result = await UserService.fetchUser(authHeader, '1');

            expect(result).toBe('Not Found');
        });
    });

    describe('createUser', () => {
        it('should create a user and return the response and data', async () => {
            const newUser = { name: 'Doe', firstName: 'John', email: 'john.doe@example.com', role: 'admin' };
            const mockResponse = { _id: '1', ...newUser };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await UserService.createUser(authHeader, newUser);

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('editUser', () => {
        it('should edit a user and return the response and data', async () => {
            const userEdited = { name: 'Doe', firstName: 'John', email: 'john.doe@example.com', role: 'admin' };
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await UserService.editUser(authHeader, '1', userEdited);

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return the response and data', async () => {
            const mockResponse = { success: true };
            global.fetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const { response, data } = await UserService.deleteUser(authHeader, '1');

            expect(response.status).toBe(200);
            expect(data).toEqual(mockResponse);
        });
    });
});
