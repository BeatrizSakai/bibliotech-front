// privateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token está armazenado

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
