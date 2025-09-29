export default function Hero() {
    const features = [
        { svg: "/air.svg", title: "Современные автобусы", subtitle: "с кондиционером" },
        { svg: "/success.svg", title: "Водители с опытом", subtitle: "от 5 лет" },
        { svg: "/discount.svg", title: "Скидка 5%", subtitle: "при заказе от 2-х единиц" },
        { svg: "/time.svg", title: "Аренда от 3 часов", subtitle: "до нескольких дней" },
    ];

    return (
        <section className="relative bg-white overflow-hidden">
            {/* SVG линия как фон */}
            <img
                src="/line.svg"
                alt="line"
                className="absolute bottom-0 left-0 w-full h-auto z-0 pointer-events-none select-none opacity-10"
            />

            {/* Контент */}
            <div className="relative z-10 max-w-[1400px] mt-16 md:mt-0 w-[95%] mx-auto px-4 md:px-8 pt-10 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Текстовый блок */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Аренда автобусов <br />
                        <span className="text-gray-900">для любых поездок</span>
                    </h1>
                    <p className="mt-4 text-lg  md:text-xl text-gray-700 max-w-lg mx-auto md:mx-0">
                        Организуем перевозки для экскурсий, корпоративов и мероприятий.
                        Современные автобусы, комфортные салоны и опытные водители — всё для вашей уверенности в дороге.
                    </p>
                    <p className="mt-3 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
                        Гибкие условия аренды, честные цены и гарантия подачи транспорта точно в срок.
                    </p>

                    {/* Кнопки */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center md:justify-start">
                        <button
                            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-500 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition shadow-md"
                        >
                            Наш каталог
                            <img src="/bus.svg" alt="bus" className="w-5 h-5" />
                        </button>

                        <button
                            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-md text-gray-800 font-medium border border-gray-300 hover:border-blue-400 hover:text-blue-500 transition shadow-sm"
                        >
                            Узнать цену
                        </button>
                    </div>
                </div>

                {/* Картинка автобуса */}
                <div className="flex justify-center md:justify-end">
                    <img
                        src="/bus11.png"
                        alt="bus"
                        className="max-w-full h-[280px] sm:h-[400px] md:h-[550px] object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Нижние плашки */}
            <div className="relative max-w-[1400px] w-[95%] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row flex-wrap justify-between gap-4 z-10">
                {features.map((f, idx) => (
                    <div
                        key={idx}
                        className="flex-1 min-w-full sm:min-w-[250px] flex items-center gap-3 bg-white/40 backdrop-blur-md px-5 sm:px-7 py-4 rounded-2xl shadow-lg"
                    >
                        <img src={f.svg} alt={f.title} className="w-6 sm:w-8 h-6 sm:h-8" />
                        <div>
                            <p className="font-semibold text-lg text-gray-900">{f.title}</p>
                            <p className="text-gray-700 text-base">{f.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
