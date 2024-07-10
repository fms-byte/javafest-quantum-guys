"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = Cookies.get("token");
    if (token) {
      fetchUserData(token);
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
      } else {
        Cookies.remove("token");
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
        const data: AuthResponse = await response.json();
        setUser(data.user);
        Cookies.set("token", data.token);
        router.push("/feed");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    router.push("/login");
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });
      if (response.ok) {
        const data: AuthResponse = await response.json();
        setUser(data.user);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, signup }}
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
