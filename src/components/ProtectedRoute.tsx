import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const loggedIn = localStorage.getItem("admin_logged_in") === "true";

    if (!loggedIn) return <Navigate to="/admin/login" replace />;

    return <>{children}</>;
}
