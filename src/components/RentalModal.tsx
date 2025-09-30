// src/components/RentalModal.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { X, Download } from "lucide-react";

type RentalModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type FormData = {
    personType: "physical" | "legal";
    firstName: string;
    lastName: string;
    middleName: string;
    country: string;
    city: string;
    address: string;
    passport: string;
    organization: string;
    organizationDetails: string;
    email: string;
    phone: string;
    busesCount: string;
    touristsCount: string;
    pickupAddress: string;
    tripType: "oneway" | "round";
    route1: string;
    route1Date: string;
    route1Time: string;
    route2: string;
    route2Date: string;
    route2Time: string;
    mileage: string;
    additionalInfo: string;
};

export default function RentalModal({ isOpen, onClose }: RentalModalProps) {
    const [formData, setFormData] = useState<FormData>({
        personType: "physical",
        firstName: "",
        lastName: "",
        middleName: "",
        country: "",
        city: "",
        address: "",
        passport: "",
        organization: "",
        organizationDetails: "",
        email: "",
        phone: "",
        busesCount: "",
        touristsCount: "",
        pickupAddress: "",
        tripType: "oneway",
        route1: "",
        route1Date: "",
        route1Time: "",
        route2: "",
        route2Date: "",
        route2Time: "",
        mileage: "",
        additionalInfo: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.phone || !formData.email) {
            alert("Пожалуйста, заполните обязательные поля: Имя, Телефон и Email");
            return;
        }

        try {
            const form = new FormData();
            form.append("_replyto", formData.email);
            form.append("_subject", "Заявка на аренду автобуса");

            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value as string);
            });

            const response = await fetch("https://formspree.io/f/manpollk", {
                method: "POST",
                body: form,
                headers: { Accept: "application/json" },
            });

            const data = await response.json();

            if (response.ok) {
                alert("Заявка успешно отправлена!");
                onClose();
            } else {
                console.error(data);
                alert("Ошибка при отправке. Проверьте правильность заполнения полей.");
            }
        } catch (err) {
            console.error(err);
            alert("Ошибка при отправке. Попробуйте еще раз.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div
                className="bg-white rounded-none sm:rounded-3xl w-full h-full sm:h-auto sm:max-h-[90%]
                           max-w-5xl sm:w-[90%] p-4 sm:p-8 relative shadow-2xl overflow-y-auto"
            >
                {/* Кнопка закрытия */}
                <button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-900 transition"
                    onClick={onClose}
                >
                    <X size={24} className="sm:w-7 sm:h-7" />
                </button>

                <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
                    Заявка на аренду автобуса
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 pb-6">
                    {/* Тип клиента */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <span className="font-semibold">Являюсь:</span>
                        <Radio
                            name="personType"
                            value="physical"
                            checked={formData.personType === "physical"}
                            onChange={handleChange}
                            label="Физ. лицо"
                        />
                        <Radio
                            name="personType"
                            value="legal"
                            checked={formData.personType === "legal"}
                            onChange={handleChange}
                            label="Юр. лицо"
                        />
                    </div>

                    {/* Контакты */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <Input placeholder="Введите имя" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <Input placeholder="Введите фамилию" name="lastName" value={formData.lastName} onChange={handleChange} />
                        <Input placeholder="Введите отчество" name="middleName" value={formData.middleName} onChange={handleChange} />
                    </div>

                    {/* Телефон + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input placeholder="Введите телефон" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
                        <Input placeholder="Введите email" name="email" value={formData.email} onChange={handleChange} type="email" required />
                    </div>

                    {/* Физ/юр */}
                    {formData.personType === "physical" ? (
                        <Input placeholder="Серия и номер паспорта" name="passport" value={formData.passport} onChange={handleChange} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <Input placeholder="Организация" name="organization" value={formData.organization} onChange={handleChange} />
                            <Input placeholder="Реквизиты" name="organizationDetails" value={formData.organizationDetails} onChange={handleChange} />
                        </div>
                    )}

                    {/* Поездка */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <Input placeholder="Кол-во автобусов" name="busesCount" type="number" value={formData.busesCount} onChange={handleChange} />
                        <Input placeholder="Число туристов" name="touristsCount" type="number" value={formData.touristsCount} onChange={handleChange} />
                        <Input placeholder="Адрес подачи автобуса" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} />
                    </div>

                    {/* Маршрут 1 */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600">Маршрут 1</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                            <span className="font-semibold">Тип маршрута:</span>
                            <Radio name="tripType" value="oneway" checked={formData.tripType === "oneway"} onChange={handleChange} label="В одну сторону" />
                            <Radio name="tripType" value="round" checked={formData.tripType === "round"} onChange={handleChange} label="Туда-обратно" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <Input placeholder="Откуда" name="route1" value={formData.route1} onChange={handleChange} />
                            <Input placeholder="Дата" name="route1Date" type="date" value={formData.route1Date} onChange={handleChange} />
                            <Input placeholder="Время" name="route1Time" type="time" value={formData.route1Time} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Маршрут 2 */}
                    {formData.tripType === "round" && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-blue-600">Маршрут 2 (обратно)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <Input placeholder="Откуда" name="route2" value={formData.route2} onChange={handleChange} />
                                <Input placeholder="Дата" name="route2Date" type="date" value={formData.route2Date} onChange={handleChange} />
                                <Input placeholder="Время" name="route2Time" type="time" value={formData.route2Time} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    <Input placeholder="Введите километраж" name="mileage" value={formData.mileage} onChange={handleChange} />

                    <div>
                        <label className="block pb-2 font-semibold">Дополнительная информация</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="Введите дополнительные пожелания"
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                        />
                    </div>

                    {/* Кнопки */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            type="submit"
                            className="w-full sm:flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg sm:rounded-xl font-semibold shadow-md hover:bg-blue-600 transition"
                        >
                            Отправить заявку
                        </button>
                        <a
                            href="/dogovor.docx"
                            download
                            className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg sm:rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
                        >
                            <Download size={20} />
                            Скачать договор
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ----- Вспомогательные компоненты ----- */
type InputProps = {
    label?: string;
    placeholder?: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

function Input({ label, placeholder, name, value, type = "text", onChange, required }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2
                           focus:ring-2 focus:ring-blue-500 outline-none
                           placeholder-gray-400 text-sm sm:text-base"
            />
        </div>
    );
}

type RadioProps = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
};

function Radio({ name, value, checked, onChange, label }: RadioProps) {
    return (
        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition 
                ${checked ? "border-blue-600" : "border-gray-400"}`}
            >
                {checked && <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>}
            </span>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <span className="text-sm sm:text-base">{label}</span>
        </label>
    );
}
