
const clients = [
    "/p1.png",
    "/p2.png",
    "/p3.png",
    "/p4.png",
    "/p5.png",
];

export default function Clients() {
    return (
        <section className="relative md:py-20 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8">
                    Наши <span className="bg-blue-500 text-white px-2 rounded-2xl">клиенты</span>
                </h2>
                <p className="text-black/90 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                    Мы гордимся сотрудничеством с ведущими компаниями отрасли.
                </p>

                {/* Круги справа налево с правильным z-index */}
                <div className="flex justify-center items-center">
                    {clients.map((logo, idx) => (
                        <div
                            key={idx}
                            className={`w-24 h-24 md:w-72 md:h-72 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm`}
                            style={{ marginLeft: idx === 0 ? 0 : -20, zIndex: idx + 1 }}
                        >
                            <img
                                src={logo}
                                alt={`Client ${idx + 1}`}
                                className="w-20 md:w-36 h-20 md:h-36 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
