import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/authContext';
import { api } from '../api/api';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("cookies", document.cookie);
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const loggedInUser = async () => {
          const { data } = await api.get(`/user/showMe`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          console.log("loggedInUser", {
            userData: data?.user,
            decodedToken,
          });
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          setUser(data?.user);
          setIsLoggedIn(true);
          navigate("/dashboard")
        }
        loggedInUser();
      }
    } catch (error) {
      console.log("Error", error);
      alert(error.message);      
    }
  }, []);

  const register = async (name, email, phone, password) => {
    try {
      console.log("regUser", { name, email, phone, password });
      const { data } = await api.post(`/auth/register`, { name, email, phone, password, role: "user" });
      console.log("userREgister", data);
      return data;
    } catch (error) {
      console.log("Error", error);
      alert(error.message);
      return;
    }
  }

  const login = async (email, password) => {
    try {
      const { data, headers } = await api.post(`/auth/login`, { email, password });
      console.log("login", data);
      const decodedToken = jwtDecode(data?.tokens?.accessTokenJWT);
      setUser(decodedToken.user);
      localStorage.setItem("accessToken", data?.tokens?.accessTokenJWT);
      localStorage.setItem("refreshToken", data?.tokens?.refreshTokenJWT);
      setIsLoggedIn(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${data?.tokens?.accessTokenJWT}`;
      navigate("/dashboard");
      return data;
    } catch (error) {
      console.log("Error", error);
      alert(error.message);
      return;
    }
  }

  const logout = async () => {
    try {
      const { data } = await api.delete("/auth/logout");
      console.log("logout", data);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      api.defaults.headers.common["Authorization"] = ``;
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      return;
    }
  }

  const verifyEmail = async (verificationToken, email) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        const { data } = await api.post('/auth/verify-email', {
          verificationToken,
          email,
        });
        return data;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const forgotPassword = async (email) => {
    try {
      const { data } = await api.post('/auth/forgot-password', {
        email,
      });
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  const resetPassword = async (password, token, email) => {
    try {
      const { data } = await api.post('/auth/reset-password', {
        password,
        token,
        email,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
