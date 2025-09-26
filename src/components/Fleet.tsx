import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // модули
import type SwiperClass from "swiper"; // импорт типа для TS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const buses = [
    { name: "автобус1", img: "/bus1.jpg", seats: 50 },
    { name: "автобус2", img: "/bus2.jpg", seats: 50 },
    { name: "Setra S 315 HDH", img: "/bus3.jpg", seats: 52 },
    { name: "автобус4", img: "/bus4.jpg", seats: 50 },
    { name: "автобус5", img: "/bus5.jpg", seats: 50 },
];

export default function Fleet() {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <section className="relative max-w-[1400px] m-auto py-16 flex justify-center">
            <div className="w-[95%] rounded-3xl shadow-2xl px-4 md:px-12 py-16 relative overflow-visible"
                 style={{
                     background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)"
                 }}
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
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true} // включаем навигацию
                    onBeforeInit={(swiper: SwiperClass) => {
                        const nav = swiper.params.navigation as { prevEl: HTMLElement | null; nextEl: HTMLElement | null };
                        nav.prevEl = prevRef.current;
                        nav.nextEl = nextRef.current;
                    }}
                    className="overflow-visible"
                >
                    {buses.map((bus, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <img
                                    src={bus.img}
                                    alt={bus.name}
                                    className="w-full h-56 md:h-64 object-cover grayscale hover:grayscale-0 transition duration-500"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{bus.name}</h3>
                                    <p className="mt-2 text-gray-700 text-base md:text-lg">
                                        Вместимость: {bus.seats} человек
                                    </p>
                                    <button className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

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
                </Swiper>
            </div>
        </section>
    );
}
