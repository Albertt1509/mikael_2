import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, ...rest }) => {
    if (!isLoggedIn) {
        // Jika pengguna belum login, redirect ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika pengguna sudah login, perbolehkan akses ke halaman yang dilindungi
    return <Route {...rest} />;
};

export default ProtectedRoute;
