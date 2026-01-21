import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'autocare_auth_token';

function getStoredToken(): string | null {
  // Check localStorage first (remembered), then sessionStorage (session only)
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const isAuthenticated = !!token;

  // Keep API service in sync with current token
  useEffect(() => {
    api.setToken(token);
  }, [token]);

  const login = (newToken: string, rememberMe: boolean) => {
    // Clear both storages first
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    // Store in appropriate storage
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      sessionStorage.setItem(TOKEN_KEY, newToken);
    }

    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
