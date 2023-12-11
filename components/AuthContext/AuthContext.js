import React, { createContext, useContext, useReducer } from 'react';

// Defina as ações de autenticação
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'SIGN_OUT':
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

// Crie o contexto
const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    const signIn = (user) => dispatch({ type: 'SIGN_IN', payload: user });
    const signOut = () => dispatch({ type: 'SIGN_OUT' });

    return (
        <AuthContext.Provider value={{ ...state, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
