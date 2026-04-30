/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useShared';

const AuthContext = createContext();

const DEMO_USERS = [
  {
    email: 'user@demo.com',
    password: 'Demo@123',
    name: 'John Doe',
    role: 'user',
    address: '123 Main St, New York, NY 10001',
    phone: '+1 234 567 8900'
  },
  {
    email: 'admin@demo.com',
    password: 'Admin@123',
    name: 'Admin User',
    role: 'admin',
    address: '456 Admin Ave, San Francisco, CA 94105',
    phone: '+1 987 654 3210'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('auth_user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsLoading(false);
          resolve(userWithoutPassword);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          role: 'user',
        };
        setUser(newUser);
        setIsLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout, 
        register, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
