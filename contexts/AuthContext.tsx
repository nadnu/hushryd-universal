import React, { createContext, useContext, useEffect, useState } from 'react';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'support' | 'manager';
}

// Simple storage utility using localStorage (works on web and can be mocked for native)
const Storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }
};

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock admin credentials - In production, this would be handled by your backend
  const mockAdmins = [
    { id: '1', name: 'Super Admin', email: 'admin@hushryd.com', password: 'admin123', role: 'superadmin' as const },
    { id: '2', name: 'Support Agent', email: 'support@hushryd.com', password: 'support123', role: 'support' as const },
    { id: '3', name: 'Manager', email: 'manager@hushryd.com', password: 'manager123', role: 'manager' as const },
  ];

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const adminData = await Storage.getItem('admin_session');
      if (adminData) {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find admin with matching credentials
      const foundAdmin = mockAdmins.find(
        admin => admin.email.toLowerCase() === email.toLowerCase() && admin.password === password
      );

      if (foundAdmin) {
        const adminData = {
          id: foundAdmin.id,
          name: foundAdmin.name,
          email: foundAdmin.email,
          role: foundAdmin.role,
        };

        // Store session data
        await Storage.setItem('admin_session', JSON.stringify(adminData));
        setAdmin(adminData);

        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await Storage.removeItem('admin_session');
      setAdmin(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
