import { UserCheck, Tag, Headphones, Clock, Phone } from "lucide-react";

const advantages = [
    {
        icon: <UserCheck className="w-8 h-8 text-white" />,
        title: "Опытные водители",
        text: "За плечами наших водителей множество маршрутов, что гарантирует Вам и вашей группе безопасность на дороге!",
    },
    {
        icon: <Tag className="w-8 h-8 text-white" />,
        title: "Экономия",
        text: "Разумный и выгодный заказ транспорта, -5% при аренде от 2-х единиц и другие бонусы!",
    },
    {
        icon: <Headphones className="w-8 h-8 text-white" />,
        title: "Грамотная консультация",
        text: "Поможем в выборе транспорта. Составим маршрут.",
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "Опыт работы 15 лет",
        text: "Наш опыт поможет Вам осуществить поездку с максимальными удобствами!",
    },
    {
        icon: <Phone className="w-8 h-8 text-white" />,
        title: "Удобство аренды",
        text: "Принимаем заказы через: сайт, телефон, e-mail.",
    },
];

export default function Advantages() {
    return (
        <section className="md:py-20 max-w-[1400px] m-auto bg-white flex justify-center">
            <div className="w-[95%]  max-w-[1400px]">
                <h2 className="text-4xl md:text-5xl font-extrabold  mb-4 text-gray-900 text-center">
                    Наши преимущества
                </h2>
                <p className="text-center text-gray-700 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
                    Современные автобусы, опытные водители и удобные условия аренды — всё для вашего комфорта.
                </p>

                {/* Верхняя строка: 3 карточки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-12 mb-5 sm:mb-12">
                    {advantages.slice(0, 3).map((adv, idx) => (
                        <div
                            key={idx}
                            className="relative bg-gray-100/60 border border-gray-300 rounded-2xl p-6 flex flex-col hover:shadow-lg transform hover:-translate-y-2 transition duration-500"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-semibold mb-14 text-gray-900">{adv.title}</h3>
                                <p className="text-gray-700 text-base md:text-lg">{adv.text}</p>
                            </div>
                            <div
                                className="absolute top-4 right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                                style={{
                                    background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)"
                                }}
                            >
                                {adv.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Нижняя строка: 2 карточки */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-12">
                    {advantages.slice(3).map((adv, idx) => (
                        <div
                            key={idx}
                            className="relative bg-gray-100/60 border border-gray-300 rounded-2xl p-6 flex flex-col hover:shadow-lg transform hover:-translate-y-2 transition duration-500"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-semibold mb-14 text-gray-900">{adv.title}</h3>
                                <p className="text-gray-700 text-base md:text-lg">{adv.text}</p>
                            </div>
                            <div
                                className="absolute top-4 right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                                style={{
                                    background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)"
                                }}
                            >
                                {adv.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
