// src/components/RequestBlock.tsx
import { useState } from "react";

export default function RequestBlock() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        from: "",
        to: "",
        date: "",
        time: "",
        email: "",
        passengers: "",
        tripType: "one-way",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Заявка отправлена! Мы скоро с вами свяжемся.");
    };

    return (
        <div
            className="mt-20 w-[90%] rounded-3xl p-3 md:p-10 text-white shadow-lg max-w-[1400px] mx-auto"
            style={{
                background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)",
            }}
        >
            <h2 className="text-3xl font-bold text-center mb-3">
                Хотите заказать автобус?
            </h2>
            <p className="text-lg text-center mb-8 opacity-90">
                Заполните заявку, и наш менеджер свяжется с вами в ближайшее время
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md text-gray-800 rounded-3xl p-8 shadow-xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Имя */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Имя *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Телефон */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Телефон *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Город */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Город</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Откуда */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Откуда</label>
                        <input
                            type="text"
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Куда */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Куда</label>
                        <input
                            type="text"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Дата */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Дата</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Время */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Время</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Пассажиры */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">Кол-во пассажиров</label>
                        <input
                            type="number"
                            name="passengers"
                            value={form.passengers}
                            onChange={handleChange}
                            min="1"
                            className="w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Тип поездки */}
                <div className="mt-6">
                    <label className="block mb-3 font-medium text-sm">Тип поездки</label>
                    <div className="flex flex-wrap gap-6">
                        {[
                            {value: "one-way", label: "В одну сторону"},
                            {value: "round-trip", label: "Туда-обратно"},
                        ].map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <span
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                                        form.tripType === option.value
                                            ? "border-blue-600"
                                            : "border-gray-400"
                                    }`}
                                >
                                    {form.tripType === option.value && (
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                                    )}
                                </span>
                                <input
                                    type="radio"
                                    name="tripType"
                                    value={option.value}
                                    checked={form.tripType === option.value}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Кнопка */}
                <div className="mt-10 text-center">
                    <a
                        href="#"
                        className="w-full sm:w-auto px-6 py-2 rounded-2xl border-2 border-blue-600 bg-white/10 text-blue-600 font-semibold text-base md:text-lg
                   hover:bg-blue-600 hover:text-white active:scale-95 transition-all shadow-md text-center inline-block"
                    >
                        Оставить заявку
                    </a>
                </div>

            </form>
        </div>
    );
}
