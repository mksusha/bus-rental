import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type SwiperClass from "swiper";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Bus = {
    id: number;
    name: string;
    seats: number;
    image_url: string[] | null;
};

function generateSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function Fleet() {
    const [buses, setBuses] = useState<Bus[]>([]);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchBuses() {
            const { data, error } = await supabase.from("buses").select("*");
            if (error) console.error(error);
            else setBuses(data as Bus[]);
        }
        fetchBuses();
    }, []);

    return (
        <section className="relative max-w-[1400px] m-auto py-16 flex justify-center">
            <div
                className="w-[95%] rounded-3xl shadow-2xl px-4 md:px-12 py-16 relative overflow-visible"
                style={{ background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)" }}
            >
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 text-center">
                    Путешествуйте с удобством
                </h2>
                <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-12 text-center">
                    Мы предоставляем современные и комфортабельные автобусы для любого мероприятия: экскурсии, корпоративы и частные поездки. Выбирайте автобус, подходящий именно вам!
                </p>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    onBeforeInit={(swiper: SwiperClass) => {
                        const nav = swiper.params.navigation as { prevEl: HTMLElement | null; nextEl: HTMLElement | null };
                        nav.prevEl = prevRef.current;
                        nav.nextEl = nextRef.current;
                    }}
                    className="overflow-visible relative fleet-swiper"
                >
                    {buses.map((bus) => {
                        const slug = generateSlug(bus.name);
                        const firstImage = bus.image_url && bus.image_url.length > 0 ? bus.image_url[0] : "/bus.svg";
                        return (
                            <SwiperSlide key={bus.id}>
                                <div className="bg-white rounded-2xl overflow-hidden">
                                    <img
                                        src={firstImage}
                                        alt={`Автобус ${bus.name}`}
                                        loading="lazy"
                                        className="w-full h-56 md:h-64 object-cover transition duration-500"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{bus.name}</h3>
                                        <p className="mt-2 text-gray-700 text-base md:text-lg">
                                            Вместимость: {bus.seats} человек
                                        </p>
                                        <Link
                                            to={`/park/${slug}`}
                                            className="inline-block w-full text-center px-4 py-2 rounded-xl border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition duration-300 font-semibold mt-3"
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                    {/* Кастомные стрелки */}
                    <div
                        ref={prevRef}
                        className="absolute top-1/2 -translate-y-1/2 left-[1px] md:left-[1px] w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <div
                        ref={nextRef}
                        className="absolute top-1/2 -translate-y-1/2 right-[1px] md:right-[1px] w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Переопределяем класс пагинации через Tailwind */}
                    <style>
                        {`
        .fleet-swiper .swiper-pagination {
            bottom: -0.5px !important;
        }
        `}
                    </style>
                </Swiper>

            </div>
        </section>
    );
}
