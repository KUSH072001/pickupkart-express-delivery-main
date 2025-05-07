
import { useState } from 'react';
import { User, LoginRequest, RegisterRequest, ProfileUpdateRequest } from '@/types';
import { useToast } from "@/components/ui/use-toast";
import { userApi } from '@/services/userService';
import { AuthState } from '@/context/types/auth';

export const useAuthOperations = (
  initialState: AuthState,
  setState: (state: AuthState) => void
) => {
  const { toast } = useToast();

  const login = async (credentials: LoginRequest): Promise<void> => {
    setState({ ...initialState, loading: true });
    try {
      const response = await userApi.loginUser(credentials);
      setState({
        user: response.user,
        token: response.token,
        loading: false
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('pickupkart_user', JSON.stringify(response.user));
      localStorage.setItem('pickupkart_token', response.token);
      
      toast({
        title: "Login Successful",
        description: `Welcome, ${response.user.full_name}!`,
      });
    } catch (error) {
      setState({ ...initialState, loading: false });
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    setState({ ...initialState, loading: true });
    try {
      const registeredUser = await userApi.registerUser(userData);
      
      // Auto-login with the newly registered user
      await login({ 
        login_name: userData.login_name, 
        password: userData.password 
      });
      
      toast({
        title: "Registration Successful",
        description: `Account created for ${registeredUser.full_name}!`,
      });
    } catch (error) {
      setState({ ...initialState, loading: false });
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User> | ProfileUpdateRequest): Promise<void> => {
    setState({ ...initialState, loading: true });
    try {
      if (!initialState.user) {
        throw new Error('No user is logged in');
      }
      
      // Update user data
      const updatedUser: User = {
        ...initialState.user,
        ...userData
      };
      
      setState({
        ...initialState,
        user: updatedUser,
        loading: false
      });
      
      // Update in localStorage
      localStorage.setItem('pickupkart_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      setState({ ...initialState, loading: false });
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "An error occurred while updating profile.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setState({ user: null, token: null, loading: false });
    localStorage.removeItem('pickupkart_user');
    localStorage.removeItem('pickupkart_token');
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });






    
  };

  return {
    login,
    register,
    updateProfile,
    logout
  };
};
