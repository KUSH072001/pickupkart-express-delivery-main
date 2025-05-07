
import { User, RegisterRequest, LoginRequest } from '../types';
import { delay, BASE_URL, USE_MOCK_FALLBACK } from './config';
import { mockUsers } from './mockData';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    await delay(500);
    return [...mockUsers];
  },
  
  getByRole: async (role: string): Promise<User[]> => {
    await delay(300);
    return mockUsers.filter(u => u.role === role);
  },
  
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    await delay(500);
    
    const userIndex = mockUsers.findIndex(u => u.user_id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData
    };
    
    return mockUsers[userIndex];
  },
  
  createAdmin: async (userData: User): Promise<User> => {
    await delay(700);
    
    const newAdmin: User = {
      ...userData,
      role: 'ADMIN'
    };
    
    mockUsers.push(newAdmin);
    return newAdmin;
  },
  
  registerUser: async (userData: RegisterRequest): Promise<User> => {
    console.log("Attempting to register user with backend:", userData);
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Important: Include cookies for sessions
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration API error:", errorData);
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      console.log("Registration success response:", data);
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('pickupkart_token', data.token);
      }
      
      // Transform backend response to match our User type
      const user: User = {
        user_id: parseInt(data.id) || Math.floor(Math.random() * 1000),
        full_name: data.fullName,
        login_name: data.loginName,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        role: data.role as 'ADMIN' | 'CUSTOMER'
      };
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (USE_MOCK_FALLBACK) {
        console.warn("Using mock registration as fallback");
        // Create a mock user as fallback for demo purposes
        const mockUser: User = {
          user_id: Math.floor(Math.random() * 1000),
          full_name: userData.full_name,
          login_name: userData.login_name,
          mobile: userData.mobile,
          email: userData.email,
          address: userData.address,
          role: userData.role
        };
        
        // Add to mock user list
        mockUsers.push(mockUser);
        return mockUser;
      }
      
      throw error;
    }
  },
  
  loginUser: async (credentials: LoginRequest): Promise<{token: string, user: User}> => {
    console.log("Attempting to login with backend:", credentials);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Important: Include cookies for sessions
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login API error:", errorData);
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      console.log("Login success response:", data);
      
      // Transform backend response to match our User type
      const user: User = {
        user_id: parseInt(data.id) || Math.floor(Math.random() * 1000),
        full_name: data.fullName,
        login_name: data.loginName,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        role: data.role as 'ADMIN' | 'CUSTOMER'
      };
      
      return {
        token: data.token,
        user: user
      };
    } catch (error) {
      console.error('Login error:', error);
      
      if (USE_MOCK_FALLBACK) {
        console.warn("Using mock login as fallback");
        // Mock login for demo purposes
        let mockUser: User | null = null;
        let mockToken = "mock-jwt-token";
        
        // Find user in mock data
        if (credentials.login_name === 'admin' && credentials.password === 'admin') {
          mockUser = {
            user_id: 1,
            full_name: 'Admin User',
            login_name: 'admin',
            mobile: '9876543210',
            email: 'admin@pickupkart.in',
            address: 'PickupKart HQ, Delhi',
            role: 'ADMIN'
          };
        } else if (credentials.login_name === 'customer' && credentials.password === 'customer') {
          mockUser = {
            user_id: 2,
            full_name: 'Sample Customer',
            login_name: 'customer',
            mobile: '9876543211',
            email: 'user2025@gmail.com',
            address: '123 Customer Street, Mumbai',
            role: 'CUSTOMER'
          };
        } else {
          // Try to find the user in our mock users array
          const user = mockUsers.find(u => 
            u.login_name === credentials.login_name && 
            // In a real app we would hash passwords, but for mock this is fine
            credentials.password === 'password'
          );
          
          if (user) {
            mockUser = user;
          } else {
            throw new Error('Invalid credentials');
          }
        }

        if (mockUser) {
          return {
            user: mockUser,
            token: mockToken
          };
        }
      }
      
      throw error;
    }
  }
};
