import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "/bus-logo.svg";
import { Link } from "react-router-dom";
import RentalModal from "./RentalModal";

const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        { label: "Наш автопарк", href: "/park" },
        { label: "О компании", href: "/about" },
        { label: "Контакты", href: "/contacts" },
    ];

    return (
        <>
            <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1400px] bg-white/40 backdrop-blur-md rounded-3xl z-50 border border-gray-200">
                <div className="flex items-center justify-between px-6 py-3">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Bus Rental Logo"
                            className="h-8 w-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
                            width={128}
                            height={32}
                            loading="lazy"
                        />
                    </Link>

                    <nav className="hidden md:flex space-x-10 font-semibold text-gray-700">
                        {menuItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="relative group px-1 py-1 hover:text-blue-500 transition"
                            >
                                {item.label}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:block flex-shrink-0">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:scale-105 transition transform duration-300"
                        >
                            Оставить заявку
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-500 transition"
                        >
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white/40 backdrop-blur-md rounded-b-xl shadow-lg">
                        <nav className="flex flex-col items-center gap-4 py-6 font-semibold text-gray-700">
                            {menuItems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="hover:text-blue-500 transition"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition"
                            >
                                Оставить заявку
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <RentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
