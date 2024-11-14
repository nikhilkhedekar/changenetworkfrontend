import { createContext } from "react";

const AuthContext = createContext({
    user: {},        
    isLoggedIn: false,
    data: null,    
    register: (name, email, password, address, long, lat) => {},
    login: (email, password) => {},
    logout: () => {},
    verifyEmail: (verificationToken, email) => {},
    forgotPassword: (email) => {},
    resetPassword: (password, token, email) => {},    
});

export default AuthContext;