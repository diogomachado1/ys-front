import React, { createContext, useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import api from "../services/api";

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromLocalstorage() {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromLocalstorage();
  }, []);

  const login = async (email, password) => {
    const {
      data: { token, user },
    } = await api.post("/pub/sessions", {
      email,
      password,
    });
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
      router.push("/streams");
      setUser(user);
    }
  };

  const logout = (email, password) => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
