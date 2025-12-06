import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
                    <p className="mt-4 text-[var(--color-text)]">A carregar...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={requireAdmin ? "/admin/login" : "/conta"} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
