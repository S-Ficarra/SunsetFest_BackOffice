import { GetAllUser, GetUser, CreateUser, EditUser, DeleteUser } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { UserMapper } from '../../mappers/user.mapper';

// Mock dependencies
jest.mock('../../services/user.service');
jest.mock('../../mappers/user.mapper');

describe('User Controller Tests', () => {

    const mockAuthHeader = 'Bearer mockToken';
    
    // Mock data
    const mockUserDto = { id: 1, name: 'John', firstName: 'Doe', email: 'john.doe@example.com', role: 'user' };
    const mockUserModel = { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user' };
    
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    // Test GetAllUser
    it('should fetch and transform all users', async () => {
        // Mock service responses
        UserService.fetchAllUsers.mockResolvedValue([mockUserDto]);
        UserMapper.transformUserDtoToModel.mockReturnValue(mockUserModel);

        const result = await GetAllUser(mockAuthHeader);

        expect(UserService.fetchAllUsers).toHaveBeenCalledWith(mockAuthHeader);
        expect(UserMapper.transformUserDtoToModel).toHaveBeenCalledWith(mockUserDto);
        expect(result).toEqual([mockUserModel]);
    });

    // Test GetUser
    it('should fetch and transform a single user', async () => {
        UserService.fetchUser.mockResolvedValue(mockUserDto);
        UserMapper.transformUserDtoToModel.mockReturnValue(mockUserModel);

        const result = await GetUser(mockAuthHeader, 1);

        expect(UserService.fetchUser).toHaveBeenCalledWith(mockAuthHeader, 1);
        expect(UserMapper.transformUserDtoToModel).toHaveBeenCalledWith(mockUserDto);
        expect(result).toEqual(mockUserModel);
    });

    // Test CreateUser
    it('should create a user and return the transformed model', async () => {
        const mockNewUserDto = { name: 'John', firstName: 'Doe', email: 'john.doe@example.com', password: 'password', role: 'user' };
        const mockResponse = { status: 200 };
        const mockData = mockUserDto;

        UserMapper.transformUserDataToDto.mockReturnValue(mockNewUserDto);
        UserService.createUser.mockResolvedValue({ response: mockResponse, data: mockData });
        UserMapper.transformUserDtoToModel.mockReturnValue(mockUserModel);

        const result = await CreateUser(mockAuthHeader, 'John', 'Doe', 'john.doe@example.com', 'password', 'user');

        expect(UserMapper.transformUserDataToDto).toHaveBeenCalledWith('John', 'Doe', 'john.doe@example.com', 'password', 'user');
        expect(UserService.createUser).toHaveBeenCalledWith(mockAuthHeader, mockNewUserDto);
        expect(UserMapper.transformUserDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockUserModel);
    });

    // Test EditUser
    it('should edit a user and return the transformed model', async () => {
        const mockEditedUserDto = { name: 'John', firstName: 'Doe', email: 'john.doe@example.com', password: 'newpassword', role: 'admin' };
        const mockResponse = { status: 200 };
        const mockData = mockUserDto;

        UserMapper.transformUserDataToDto.mockReturnValue(mockEditedUserDto);
        UserService.editUser.mockResolvedValue({ response: mockResponse, data: mockData });
        UserMapper.transformUserDtoToModel.mockReturnValue(mockUserModel);

        const result = await EditUser(mockAuthHeader, { name: 'John', firstName: 'Doe', email: 'john.doe@example.com', password: 'newpassword', role: 'admin' }, 1);

        expect(UserMapper.transformUserDataToDto).toHaveBeenCalledWith('John', 'Doe', 'john.doe@example.com', 'newpassword', 'admin');
        expect(UserService.editUser).toHaveBeenCalledWith(mockAuthHeader, 1, mockEditedUserDto);
        expect(UserMapper.transformUserDtoToModel).toHaveBeenCalledWith(mockData);
        expect(result).toEqual(mockUserModel);
    });

    // Test DeleteUser
    it('should delete a user and return the response data', async () => {
        const mockResponse = { status: 200 };
        const mockData = { message: 'User deleted successfully' };

        UserService.deleteUser.mockResolvedValue({ response: mockResponse, data: mockData });

        const result = await DeleteUser(mockAuthHeader, 1);

        expect(UserService.deleteUser).toHaveBeenCalledWith(mockAuthHeader, 1);
        expect(result).toEqual(mockData);
    });

    // Test Error Handling in CreateUser
    it('should throw an error if createUser fails', async () => {
        const mockNewUserDto = { name: 'John', firstName: 'Doe', email: 'john.doe@example.com', password: 'password', role: 'user' };
        const mockResponse = { status: 400 };
        const mockData = { message: 'User creation failed' };

        UserMapper.transformUserDataToDto.mockReturnValue(mockNewUserDto);
        UserService.createUser.mockResolvedValue({ response: mockResponse, data: mockData });

        await expect(CreateUser(mockAuthHeader, 'John', 'Doe', 'john.doe@example.com', 'password', 'user'))
            .rejects
            .toThrow('User creation failed');
    });
});
