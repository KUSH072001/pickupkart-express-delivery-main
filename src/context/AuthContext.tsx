
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { AuthContextType, AuthState } from './types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true
  });

  const { login, register, updateProfile, logout } = useAuthOperations(state, setState);

  useEffect(() => {
    // Check for stored auth data on initial load
    const storedUser = localStorage.getItem('pickupkart_user');
    const storedToken = localStorage.getItem('pickupkart_token');
    
    if (storedUser && storedToken) {
      setState({
        user: JSON.parse(storedUser),
        token: storedToken,
        loading: false
      });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      isAuthenticated: !!state.user && !!state.token,
      login,
      register,
      logout,
      loading: state.loading,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
