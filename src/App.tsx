import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import FleetPage from "./pages/FleetPage";
import BusDetail from "./pages/BusDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import RentalModal from "./components/RentalModal";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (

            <Router>
                <RentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <Routes>
                    <Route
                        path="/"
                        element={<Home openModal={() => setIsModalOpen(true)} />}
                    />
                    <Route path="/park" element={<FleetPage />} />
                    <Route path="/park/:slug" element={<BusDetail />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
    );
}

export default App;
