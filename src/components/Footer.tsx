import { Phone, Mail, Clock, MapPin, Printer } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RentalModal from './RentalModal';

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <footer
                className="max-w-[1400px] w-[95%] m-auto text-white rounded-t-3xl"
                style={{background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)"}}
            >
                <div
                    className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 py-3 px-6 border-b border-white/30 text-center md:text-left">
                    <Link to="/" className="block mt-2 h-14 w-auto">
                        <img
                            src="/bus-logo1.svg"
                            alt="Логотип компании"
                            className="h-9 w-auto object-contain drop-shadow-md mx-auto md:mx-0"
                        />
                    </Link>

                    <nav
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm md:text-base font-medium justify-center items-center">
                        <Link to="/park" className="hover:underline">Наш автопарк</Link>
                        <Link to="/about" className="hover:underline">О компании</Link>
                        <Link to="/contacts" className="hover:underline">Контакты</Link>
                    </nav>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block px-4 py-2 rounded-2xl bg-white text-blue-600 font-semibold text-sm md:text-base hover:bg-gray-100 transition shadow-md"
                    >
                        Оставить заявку
                    </button>
                </div>

                <div
                    className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-6 text-sm md:text-base">
                    <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <Clock size={18}/>
                            <p className="font-semibold">С 8.00 до 20.00</p>
                        </div>
                        <p>Без выходных</p>
                        <div className="flex items-center gap-2">
                            <MapPin size={18}/>
                            <p>220015, Минск, ул. Янки Мавра, 47/7</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <Phone size={18}/>
                            <a href="tel:+375296289029" className="hover:underline">
                                +375 29 628 90 29
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Printer size={18}/>
                            <span>+375 17 373 55 55 (на автомате)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={18}/>
                            <a href="mailto:minbeltrans@mail.ru" className="hover:underline">
                                minbeltrans@mail.ru
                            </a>
                        </div>
                    </div>
                </div>

                {/* юр. информация */}
                <div className="border-t border-white/30 py-4 text-center text-xs md:text-sm opacity-80">
                    ЧТУП «МинБелТранс» &nbsp; | &nbsp; УНП 691421991
                </div>
            </footer>


            <RentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
}
