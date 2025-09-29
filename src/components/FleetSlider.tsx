// src/components/FleetSlider.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Bus = {
    id: number;
    name: string;
    seats: number;
    price: number;
    min_time: number;
    image_url: string[] | null;
};

function generateSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

type FleetSliderProps = {
    currentBusId: number;
};

export default function FleetSlider({ currentBusId }: FleetSliderProps) {
    const [buses, setBuses] = useState<Bus[]>([]);

    const fetchBuses = async () => {
        const { data, error } = await supabase.from("buses").select("*");
        if (error) console.error(error);
        else setBuses(data as Bus[]);
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const filteredBuses = buses.filter((bus) => bus.id !== currentBusId).slice(0, 4);

    if (filteredBuses.length === 0) return null;

    return (
        <div className="max-w-[1400px] w-[90%] mx-auto my-20 px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наш автопарк</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBuses.map((bus) => {
                    const slug = generateSlug(bus.name);
                    const firstImage =
                        bus.image_url && bus.image_url.length > 0
                            ? bus.image_url[0]
                            : "/bus.svg";

                    return (
                        <div
                            key={bus.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <img
                                src={firstImage}
                                alt={bus.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="font-semibold text-lg md:text-xl text-gray-900">{bus.name}</h3>
                                <div className="flex flex-wrap gap-2 text-gray-700 text-sm md:text-base">
                                    <div className="flex items-center gap-1">
                                        <img src="/time1.svg" className="w-5 h-5" />
                                        <span>&gt; {bus.min_time} ч</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img src="/seat1.svg" className="w-5 h-5" />
                                        <span>{bus.seats} мест</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img src="/money.svg" className="w-5 h-5" />
                                        <span>от {bus.price} руб./час</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/park/${slug}`}
                                    className="mt-3 inline-block w-full text-center px-3 py-2 rounded-xl border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition font-semibold"
                                >
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
