import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoutes = ({ isAdmin, element }) => {
    const { isLoading, isAuthenticate, User } = useSelector((state) => state.User);

    // Redirect to login if not authenticated
    if (!isAuthenticate) {
        return <Navigate to="/login" />;
    }

    // Admin-specific route check
    if (isAdmin && User?.User?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    // Non-admin users should be allowed (user or admin roles)
    if (!isAdmin && User?.User?.role !== "user" && User?.User?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    // Render the element if all checks pass
    return element;
};

export default ProtectedRoutes;
