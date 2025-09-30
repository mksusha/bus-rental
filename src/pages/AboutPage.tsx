// src/pages/AboutPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Users, Briefcase, Award, Building2 } from "lucide-react";

export default function AboutPage() {
    const stats = [
        { value: "17–57", label: "мест в автобусах", icon: <Users className="w-8 h-8 text-white" /> },
        { value: "23", label: "года на рынке", icon: <Briefcase className="w-8 h-8 text-white" /> },
        { value: "25", label: "сотрудников", icon: <Building2 className="w-8 h-8 text-white" /> },
        { value: "100%", label: "качество сервиса", icon: <Award className="w-8 h-8 text-white" /> },
    ];

    return (
        <>
            <PageTitle
                title="О компании МинБелТранс | Аренда автобусов с водителем"
                description="МинБелТранс — надежный перевозчик по Беларуси и за её пределами. Узнайте о нашей компании, автопарке, опыте и преимуществах работы с нами."
            />

            <Header />

            {/* Основной блок */}
            <section className="max-w-[1400px] w-[90%] mx-auto mt-2 md:mt-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 items-center">
                {/* Картинка */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <img
                        src="/map.jpg"
                        alt="Автопарк МинБелТранс"
                        className="rounded-3xl w-full max-w-2xl object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Текст + статистика */}
                <div className="order-2 lg:order-1 space-y-10">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            О компании
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            МинБелТранс — надежный перевозчик по Беларуси и за её пределами.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Компания <span className="font-semibold">"МинБелТранс"</span> предоставляет услуги перевозки людей
                            и организации перевозок от 17 до 57 пассажиров. Мы на рынке уже более 23 лет,
                            обеспечивая качество обслуживания на высшем уровне.
                        </p>
                    </div>

                    {/* Карточки статистики */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {stats.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative bg-gray-100/60 border border-gray-300 rounded-2xl p-6 flex flex-col hover:shadow-lg transition duration-500"
                            >
                                <div
                                    className="absolute top-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                                    style={{
                                        background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-blue-600">{item.value}</h2>
                                <p className="mt-2 text-gray-700 text-base md:text-lg">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Дополнительная информация */}
            <section className="max-w-[1400px] w-[90%] mx-auto pb-20 space-y-8 text-gray-800">
                <h2 className="text-2xl font-bold text-gray-900">Почему выбирают нас</h2>
                <p>
                    Многолетний опыт и профессионализм позволяет нам не подводить своих клиентов
                    и доставлять их в нужное место вовремя. В штате компании работают специалисты,
                    специализирующиеся на перевозках людей по Минску и по Беларуси, а также водители,
                    осуществляющие международные перевозки пассажиров.
                </p>
                <p>
                    Наш автобусный парк состоит из современно-оснащенных автобусов, которые позволяют
                    осуществлять комфортабельную и надежную перевозку, как пассажиров, так и багажа,
                    на дальние расстояния. Четко составленные маршруты и отличное знание дорог нашими
                    водителями позволяют оперативно ориентироваться в различных ситуациях.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-10">Перевозка людей</h2>
                <p>
                    В наше время автомобильная перевозка людей очень востребована. Это объясняется
                    ускоряющимся темпом жизни и желанием побывать в различных местах за короткое время.
                    Вы сами можете выбрать наиболее комфортабельный для себя рейс.
                </p>
                <p>
                    Пассажирские перевозки автобусами используются для самых разнообразных целей:
                    встречи делегаций, экскурсии, корпоративные выезды и многое другое, где необходимо
                    перевозить большое количество людей.
                </p>
            </section>

            <Footer />
        </>
    );
}
