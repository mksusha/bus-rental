import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

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

export default function FleetPage() {
    const [buses, setBuses] = useState<Bus[]>([]);

    const fetchBuses = async () => {
        const { data, error } = await supabase.from("buses").select("*");
        if (error) console.error(error);
        else setBuses(data as Bus[]);
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    return (
        <>
            <PageTitle
                title="Автобусы для почасовой аренды с водителем"
                description="Перевозка людей на арендуемых автобусах с водителем. Оплата от 70 рублей в час. Минимальный заказ — 3 часа. Звоните +375 29 628 90 29."
            />


            <Header />

            <main className="p-8 max-w-[1400px] mb-5 mt-24 mx-auto">
                <div
                    className="relative mb-14 rounded-3xl shadow-sm overflow-hidden"
                    style={{
                        backgroundImage: "url('/bus-stop1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "200px",
                    }}
                >
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]"></div>
                    <div className="relative z-10 text-center py-12 px-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Наш автопарк
                        </h1>
                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
                            Выбирайте автобус под ваши нужды: комфорт, удобство и доступные цены.
                        </p>
                    </div>
                </div>


                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-12 mb-5">
                    {buses.map((bus) => {
                        const slug = generateSlug(bus.name);
                        const firstImage = bus.image_url && bus.image_url.length > 0
                            ? bus.image_url[0]
                            : "/bus.svg";

                        return (
                            <article
                                key={bus.id}
                                className="bg-gray-100/60 border border-gray-300 rounded-2xl flex flex-col"
                            >
                                <img
                                    src={firstImage}
                                    alt={`Автобус ${bus.name}`}
                                    loading="lazy"
                                    className="w-full h-56 object-cover rounded-t-2xl"
                                />

                                <div className="p-6 flex flex-col gap-3">
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                        {bus.name}
                                    </h2>

                                    <div className="flex items-center gap-4 text-gray-700">
                                        <div className="flex items-center gap-1 text-sm md:text-base">
                                            <img src="/time1.svg" alt="Время аренды" className="w-6 h-6"/>
                                            <span>&gt; {bus.min_time} ч</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm md:text-base">
                                            <img src="/seat1.svg" alt="Количество мест" className="w-6 h-6"/>
                                            <span>{bus.seats} мест</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm md:text-base">
                                            <img src="/money.svg" alt="Цена аренды" className="w-6 h-6"/>
                                            <span>от {bus.price} руб./час</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/park/${slug}`}
                                        className="inline-block w-full text-center px-4 py-2 rounded-xl border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition duration-300 font-semibold mt-3"
                                    >
                                        Подробнее
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </main>

            <Footer />
        </>
    );
}
