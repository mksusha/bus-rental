"use client";

const features = [
    {
        title: "Туристические поездки",
        text: "Аренда комфортабельного автобуса с водителем для поездок по Беларуси и заграницу.",
        img: "/tour.jpg",
    },
    {
        title: "Детские поездки",
        text: "Организация транспорта для школьных поездок, экскурсий. Наши водители проходят специальный инструктаж для перевозки детей.",
        img: "/kids.jpg",
    },
    {
        title: "Мероприятия",
        text: "Предоставление транспорта для доставки гостей на торжества, корпоративы и сотрудников к месту работы.",
        img: "/events.jpg",
    },
    {
        title: "Деловые встречи",
        text: "Организация трансферов в аэропорт, гостиницу, экскурсии и деловые поездки.",
        img: "/business.jpg",
    },
];

export default function Features() {
    return (
        <section
            id="features-section"
            className="py-20 max-w-[1400px] mx-auto w-[90%] grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            <div className="md:sticky md:top-20 h-fit py-5">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 flex flex-col md:flex-row items-center gap-2 md:gap-2 text-center md:text-left">
                    <span>Наши</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-2xl">возможности</span>
                </h2>

                <p className="text-lg md:text-xl leading-relaxed text-gray-900">
                    Мы предоставляем разнообразные услуги по аренде автобусов для разных целей.
                    У нас есть решения как для туристических поездок, так и для корпоративных мероприятий,
                    детских экскурсий и трансферов в аэропорт. Комфорт, безопасность и профессиональные водители — наш приоритет.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="rounded-2xl shadow-lg overflow-hidden bg-white">
                        <div className="h-64 w-full overflow-hidden">
                            <img
                                src={feature.img}
                                alt={feature.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                width={600}
                                height={400}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
