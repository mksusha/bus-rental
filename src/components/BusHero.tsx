export default function Hero() {
    const images = ["/bus2.jpg", "/bus3.jpg", "/bus4.jpg", "/bus5.jpg"];

    const features = [
        { svg: "/air.svg", title: "Современные автобусы", subtitle: "с кондиционером" },
        { svg: "/success.svg", title: "Водители с опытом", subtitle: "от 5 лет" },
        { svg: "/discount.svg", title: "Скидка 5%", subtitle: "при заказе от 2-х единиц" },
        { svg: "/time.svg", title: "Аренда от 3 часов", subtitle: "до нескольких дней" },
    ];

    return (
        <section className="relative  bg-white overflow-hidden mt-20 min-h-[auto] md:min-h-[750px]">
            {/* SVG линия как фон */}
            <img
                src="/line.svg"
                alt="line"
                className="absolute bottom-0 left-0 w-full h-auto z-0 pointer-events-none select-none"
            />

            {/* Контент */}
            <div className="relative z-10 max-w-[95%] mx-auto px-2 pt-12 md:pt-24 pb-12 md:pb-32 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900">
                    Аренда автобусов <br/>
                    <span className="text-gray-900">для любых поездок</span>
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-lg text-gray-600 max-w-2xl mx-auto">
                    Удобные и современные автобусы для экскурсий, корпоративов и мероприятий.
                </p>

                <div className="mt-6 sm:mt-8 flex justify-center gap-3">
                    <button
                        className="w-full max-w-[160px] sm:w-auto sm:max-w-none sm:px-4 py-3 rounded-2xl bg-blue-500 text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                        Наш каталог
                        <img src="/bus.svg" alt="bus" className="w-5 h-5"/>
                    </button>

                    <button
                        className="w-full max-w-[160px] sm:w-auto sm:max-w-none sm:px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-md text-gray-700 font-medium border border-gray-300 hover:border-blue-400 hover:text-blue-500 transition">
                        Узнать цену
                    </button>
                </div>


                {/* Перекрывающиеся кружки с фото */}
                <div className="sm:mt-16 mt-8 flex justify-center -space-x-3 sm:-space-x-4 relative z-10">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 overflow-hidden ${
                                idx === images.length - 1 ? "border-white" : "border-white"
                            }`}
                        >
                            <img src={img} alt={`bus ${idx + 1}`} className="w-full h-full object-cover"/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Нижние плашки */}
            <div
                className="relative max-w-[95%] sm:absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 pb-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 z-10">
                {features.map((f, idx) => (
                    <div
                        key={idx}
                        className="flex-1 sm:flex-none min-w-full sm:min-w-[220px] flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 sm:px-7 py-3 sm:py-4 rounded-2xl shadow-lg text-left"
                    >
                        <img src={f.svg} alt={f.title} className="w-6 sm:w-8 h-6 sm:h-8" />
                        <div>
                            <p className="font-semibold text-sm sm:text-lg text-gray-900">{f.title}</p>
                            <p className="text-gray-700 text-xs sm:text-base">{f.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
