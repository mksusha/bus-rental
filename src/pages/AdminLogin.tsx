// src/pages/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
            localStorage.setItem("admin_logged_in", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
            <form
                onSubmit={handleLogin}
                className="bg-white backdrop-blur-md bg-opacity-70 p-10 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                    Вход в админку
                </h2>

                {error && (
                    <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}
