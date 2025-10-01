import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AddBusForm from "../components/AddBusForm";

type Bus = {
    id: number;
    name: string;
    seats: number;
    price: number;
    driver_exp: number;
    min_time: number;
    image_url: string[] | null;
    toilet: boolean;
    tea_coffee: boolean;
    reclining_seats: boolean;
    ac: boolean;
    luggage: string;
};

export default function AdminDashboard() {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [editingBus, setEditingBus] = useState<Bus | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchBuses = async () => {
        const { data, error } = await supabase.from("buses").select("*");
        if (error) console.error(error);
        else setBuses(data as Bus[]);
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const handleAddClick = () => {
        setEditingBus(null);
        setIsFormOpen(true);
    };

    const handleEdit = (bus: Bus) => {
        setEditingBus(bus);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить автобус?")) return;
        const { error } = await supabase.from("buses").delete().eq("id", id);
        if (error) alert("Ошибка: " + error.message);
        else fetchBuses();
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingBus(null);
        fetchBuses();
    };

    const handleRemoveImage = async (bus: Bus, imageUrl: string) => {
        if (!confirm("Удалить это фото?")) return;

        const newImages = bus.image_url?.filter(u => u !== imageUrl) || [];
        const { error } = await supabase
            .from("buses")
            .update({ image_url: newImages })
            .eq("id", bus.id);

        if (error) alert("Ошибка: " + error.message);
        else fetchBuses();
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-blue-500">Управление автопарком</h1>

            <div className="mb-8">
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200"
                >
                    Добавить автобус
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-start pt-16 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[1400px] p-8 relative animate-fadeIn">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition"
                        >
                            ×
                        </button>
                        <AddBusForm onAdded={handleFormClose} busToEdit={editingBus} />
                    </div>
                </div>
            )}

            <section>
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Список автобусов</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buses.map(bus => (
                        <div
                            key={bus.id}
                            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="flex gap-2 overflow-x-auto mb-4">
                                {bus.image_url && bus.image_url.length > 0 ? (
                                    bus.image_url.map(url => (
                                        <div key={url} className="relative">
                                            <img
                                                src={url}
                                                alt={bus.name}
                                                className="w-28 h-28 object-cover rounded-xl"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(bus, url)}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <img
                                        src="/bus.svg"
                                        alt={bus.name}
                                        className="w-28 h-28 object-cover rounded-xl"
                                    />
                                )}
                            </div>

                            <h3 className="font-semibold text-xl mb-1 text-gray-800">{bus.name}</h3>
                            <p className="text-gray-600">Мест: {bus.seats}</p>
                            <p className="text-gray-600">Стоимость: {bus.price} руб./час</p>
                            <p className="text-gray-600">Мин. время заказа: {bus.min_time} ч</p>
                            <p className="text-gray-600">Опыт водителя: {bus.driver_exp} лет</p>
                            <p className="text-gray-600">
                                Удобства: {[
                                bus.toilet && "Туалет",
                                bus.tea_coffee && "Чай/Кофе",
                                bus.reclining_seats && "Раскладывающиеся кресла",
                                bus.ac && "Кондиционер"
                            ].filter(Boolean).join(", ") || "—"}
                            </p>
                            <p className="text-gray-600">Багаж: {bus.luggage || "—"}</p>

                            <div className="mt-5 flex gap-3">
                                <button
                                    onClick={() => handleEdit(bus)}
                                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg shadow-md transition-all"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(bus.id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md transition-all"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
