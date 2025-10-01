import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";

export default function ContactsPage() {
    const contacts = [
        { icon: <MapPin className="w-8 h-8 text-white" />, title: "Адрес", lines: ["Минск, ул. Янки Мавра, 47/7", "220015"] },
        { icon: <Phone className="w-8 h-8 text-white" />, title: "Телефон", lines: ["Моб.: +375 (29) 628-90-29"] },
        { icon: <Printer className="w-8 h-8 text-white" />, title: "Факс", lines: ["+375 17 373 55 55"] },
        { icon: <Mail className="w-8 h-8 text-white" />, title: "E-mail", lines: ["minbeltrans@mail.ru"] },
        { icon: <Clock className="w-8 h-8 text-white" />, title: "Режим работы", lines: ["08:00 – 20:00", "(без выходных)"] },
    ];

    return (
        <>
            <PageTitle
                title="Компания Avtobus.by — город Минск"
                description="Аренда пассажирских автобусов с профессиональным водителем. Перевозка людей по Республике Беларусь и за её пределами."
            />

            <Header />

            <main className="max-w-[1400px] w-[95%] mx-auto mt-16 py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
                    Контакты
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800">
                    {contacts.map((item, idx) => (
                        <section
                            key={idx}
                            className="relative bg-gray-100/60 border border-gray-300 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-lg transition duration-300"
                        >
                            <div
                                className="absolute top-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                                style={{ background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)" }}
                            >
                                {item.icon}
                            </div>
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            {item.lines.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </section>
                    ))}
                </div>

                <section className="mt-12 w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-gray-300">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=27.488241%2C53.890277&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozNTkyNzE4MjkwEkXQkdC10LvQsNGA0YPRgdGMLCDQnNGW0L3RgdC6LCDQstGD0LvRltGG0LAg0K_QvdC60ZYg0JzQsNGe0YDQsCwgNDfQujciCg3t59tBFaWPV0I%2C&z=17.06"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        title="Карта Минск, ул. Янки Мавра, 47/7"
                    ></iframe>
                </section>
            </main>

            <Footer />
        </>
    );
}
