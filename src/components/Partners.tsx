const moreClients = [
    "/l1.jpeg",
    "/l2.svg",
    "/l3.gif",
    "/l4.png",
    "/l5.jpg",
];

const clients = [
    "/p1.png",
    "/p2.png",
    "/p3.png",
    "/p4.png",
    "/p5.png",
];

export default function Clients() {
    return (
        <section className="relative pt-5 mb-8 md:mb-16 pb-20 md:py-20 bg-white">
            <div className="max-w-[1400px] mx-auto w-[95%] text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8">
                    Наши{" "}
                    <span className="bg-blue-500 text-white px-2 rounded-2xl">
            клиенты
          </span>
                </h2>
                <p className="text-black/90 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                    Мы гордимся сотрудничеством с ведущими компаниями отрасли.
                </p>

                {/* Первый ряд */}
                <div className="flex justify-center items-center mb-10git add .
">
                    {clients.map((logo, idx) => (
                        <div
                            key={idx}
                            className="w-24 h-24 md:w-72 md:h-72 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm"
                            style={{ marginLeft: idx === 0 ? 0 : -20, zIndex: idx + 1 }}
                        >
                            <img
                                src={logo}
                                alt={`Логотип клиента ${idx + 1}`}
                                className="w-20 md:w-36 h-20 md:h-36 object-contain"
                                loading="lazy"
                                width={144}
                                height={144}
                            />
                        </div>
                    ))}
                </div>

                {/* Второй ряд */}
                <div className="flex justify-center items-center">
                    {moreClients.map((logo, idx) => (
                        <div
                            key={idx}
                            className="w-24 h-24 md:w-72 md:h-72 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm"
                            style={{ marginLeft: idx === 0 ? 0 : -20, zIndex: idx + 1 }}
                        >
                            <img
                                src={logo}
                                alt={`Логотип клиента ${idx + 6}`}
                                className="w-20 md:w-36 h-20 md:h-36 object-contain"
                                loading="lazy"
                                width={144}
                                height={144}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
