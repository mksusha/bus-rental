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
    image_url: string[] | null; // массив фото
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
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Управление автопарком</h1>

            <div className="mb-6">
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Добавить автобус
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
                        >
                            ×
                        </button>
                        <AddBusForm onAdded={handleFormClose} busToEdit={editingBus} />
                    </div>
                </div>
            )}

            <section>
                <h2 className="text-xl font-semibold mb-4">Список автобусов</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buses.map(bus => (
                        <div key={bus.id} className="bg-white p-4 rounded shadow flex flex-col">
                            <div className="flex gap-2 overflow-x-auto mb-2">
                                {bus.image_url && bus.image_url.length > 0 ? (
                                    bus.image_url.map(url => (
                                        <div key={url} className="relative">
                                            <img
                                                src={url}
                                                alt={bus.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(bus, url)}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <img
                                        src="/bus.svg"
                                        alt={bus.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                )}
                            </div>

                            <h3 className="font-semibold text-lg">{bus.name}</h3>
                            <p>Мест: {bus.seats}</p>
                            <p>Стоимость: {bus.price} руб./час</p>
                            <p>Мин. время заказа: {bus.min_time} ч</p>
                            <p>Опыт водителя: {bus.driver_exp} лет</p>
                            <p>Удобства: {[
                                bus.toilet && "Туалет",
                                bus.tea_coffee && "Чай/Кофе",
                                bus.reclining_seats && "Раскладывающиеся кресла",
                                bus.ac && "Кондиционер"
                            ].filter(Boolean).join(", ") || "—"}</p>
                            <p>Багаж: {bus.luggage || "—"}</p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(bus)}
                                    className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(bus.id)}
                                    className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
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
