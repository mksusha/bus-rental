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
            {/* Левая колонка с текстом */}
            <div className="md:sticky md:top-20 h-fit py-5 space-y-4">
                <h2 className="text-4xl md:text-4xl font-extrabold leading-tight text-center md:text-left ">
                    Аренда автобусов по Беларуси. <br/> Уже{" "}
                    <span className="bg-blue-500 text-white px-2 rounded-2xl">15 лет</span> с заботой о вас!
                </h2>

                <p className="text-lg md:text-xl text-gray-900">
                    Мы — небольшая компания с современными автобусами Mercedes и Setra на 40–59 мест.
                    Осознанно остаемся маленькими, чтобы гарантировать персональное внимание и качество.
                </p>

                <div className="space-y-2 text-base md:text-lg text-gray-800">
                    <p className="font-semibold">Почему выбирают нас?</p>
                    <ul className="space-y-2">
                        <li>
                            <strong>Опыт с человеческим лицом.</strong> Наш директор лично за рулём — он контролирует
                            каждый рейс. Вы всегда общаетесь напрямую с decision-maker, а не менеджером.
                        </li>
                        <li>
                            <strong>Знаем Беларусь идеально.</strong> Наши взрослые водители изучили не только дороги,
                            но и все туристические места, зоны отдыха и бизнес-локации.
                        </li>
                        <li>
                            <strong>Техника, которой доверяем.</strong> Только Mercedes и Setra — эталоны безопасности и
                            комфорта. Тщательное обслуживание каждого автобуса.
                        </li>
                    </ul>
                </div>

                <div className="space-y-2 text-base md:text-lg text-gray-800">
                    <p className="font-semibold">Для кого наши услуги?</p>
                    <ul className="list-disc list-inside space-y-2 marker:text-blue-500">
                        <li>Туристические группы — проложим лучший маршрут</li>
                        <li>Корпоративные перевозки — пунктуальность и комфорт</li>
                        <li>Свадьбы и праздники — создаём настроение</li>
                    </ul>
                </div>


                <p className="text-base md:text-lg text-gray-800">
                    Мы не просто сдаём автобусы — мы становимся частью вашего события.
                    Арендуя транспорт у нас, вы получаете уверенность в надёжном партнёре.
                </p>

                <p className="text-base md:text-lg text-gray-800 font-semibold">
                    Позвоните — и убедитесь, как приятно иметь дело с теми, кто действительно любит своё дело.
                </p>
            </div>

            {/* Правая колонка — карточки */}
            <div className="flex flex-col gap-6">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition"
                    >
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
