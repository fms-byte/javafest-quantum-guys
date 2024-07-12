"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  updatedAt: string | null;
  lastLogin: string | null;
  lastLogout: string | null;
  emailConfirmed: boolean;
  banned: boolean;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, username: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success?: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await checkAuth();
    };
    checkAuthStatus();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/user");
      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
        router.push("/feed");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || "Forgot password failed" };
      }
    } catch (error) {
      console.error("Forgot password error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        signup,
        checkAuth,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
