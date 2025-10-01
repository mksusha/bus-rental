import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    Coffee,
    Toilet,
    AirVent,
    User,
    Clock,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import RequestBlock from "../components/RequestBlock";
import FleetSlider from "../components/FleetSlider";
import PageTitle from "../components/PageTitle";

type Bus = {
    id: number;
    name: string;
    seats: number;
    price: number;
    min_time: number;
    driver_exp: number;
    image_url: string[] | null;
    toilet: boolean;
    tea_coffee: boolean;
    reclining_seats: boolean;
    ac: boolean;
    luggage: string;
};

function generateSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

export default function BusDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [bus, setBus] = useState<Bus | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [fade, setFade] = useState(false);

    const fetchBus = async () => {
        const { data, error } = await supabase.from("buses").select("*");
        if (!error) {
            const foundBus = (data as Bus[]).find((b) => generateSlug(b.name) === slug);
            if (foundBus) {
                setBus(foundBus);
                setMainImage(foundBus.image_url ? foundBus.image_url[0] : "/bus.svg");
            }
        }
    };

    useEffect(() => {
        fetchBus();
    }, [slug]);

    const changeImage = (newImage: string) => {
        setFade(true);
        setTimeout(() => {
            setMainImage(newImage);
            setFade(false);
        }, 200);
    };

    if (!bus) return <div>Загрузка...</div>;

    const title = `Аренда "${bus.name}" в Минске`;
    const description = `Аренда пассажирского автобуса "${bus.name}" с профессиональным водителем в Минске. Звоните +375 29 628 90 29.`;



    return (
        <>
            <PageTitle
                title={title}
                description={description}
            />
            <Header />
            <div className="max-w-[1400px] w-[90%] mx-auto mb-24 mt-28 md:mt-40">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                    <h1 className="text-4xl text-center sm:text-5xl font-bold lg:hidden">{bus.name}</h1>
                    <div className="lg:w-1/2 relative">
                        <img
                            src={mainImage || "/bus.svg"}
                            alt={bus.name}
                            className={`w-full h-80 sm:h-96 object-cover rounded-2xl transition-opacity duration-300 ${
                                fade ? "opacity-0" : "opacity-100"
                            }`}
                            loading="lazy"
                        />
                        {bus.image_url && bus.image_url.length > 1 && (
                            <>
                                <button
                                    onClick={() => {
                                        const idx = bus.image_url!.indexOf(mainImage!);
                                        const prev = idx === 0 ? bus.image_url!.length - 1 : idx - 1;
                                        changeImage(bus.image_url![prev]);
                                    }}
                                    className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 sm:p-3 rounded-full shadow-md backdrop-blur-sm"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </button>
                                <button
                                    onClick={() => {
                                        const idx = bus.image_url!.indexOf(mainImage!);
                                        const next = idx === bus.image_url!.length - 1 ? 0 : idx + 1;
                                        changeImage(bus.image_url![next]);
                                    }}
                                    className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 sm:p-3 rounded-full shadow-md backdrop-blur-sm"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </button>
                            </>
                        )}
                        {bus.image_url && bus.image_url.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto mt-4 pb-2 scrollbar-hide">
                                {bus.image_url.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${bus.name}-${idx}`}
                                        className={`w-24 h-20 sm:w-32 sm:h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                                            img === mainImage
                                                ? "border-blue-500 shadow-md"
                                                : "border-transparent hover:border-blue-300"
                                        }`}
                                        onClick={() => changeImage(img)}
                                        loading="lazy"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="lg:w-2/3 flex ml-2 flex-col gap-8">
                        <h1 className="hidden lg:block mt-5 text-6xl font-bold">{bus.name}</h1>
                        <div className="space-y-6 text-xl">
                            <div className="flex items-center gap-3">
                                <img src="/seat1.svg" className="w-8 h-8 text-blue-500" />
                                <span className="text-black text-2xl">Кол-во мест: {bus.seats}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src="/money.svg" className="w-8 h-8 text-blue-500" />
                                <span className="text-black text-2xl">Стоимость: от {bus.price} руб./час</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {bus.toilet && (
                                <div className="flex items-center gap-2 border border-blue-500 rounded-2xl px-5 py-3 text-blue-500 text-lg">
                                    <Toilet className="w-5 h-5" />
                                    <span>Туалет</span>
                                </div>
                            )}
                            {bus.tea_coffee && (
                                <div className="flex items-center gap-2 border border-blue-500 rounded-2xl px-5 py-3 text-blue-500 text-lg">
                                    <Coffee className="w-5 h-5" />
                                    <span>Чай/Кофе</span>
                                </div>
                            )}
                            {bus.reclining_seats && (
                                <div className="flex items-center gap-2 border border-blue-500 rounded-2xl px-5 py-3 text-blue-500 text-lg">
                                    <img src="/seat1.svg" className="w-5 h-5" />
                                    <span>Раскладывающиеся кресла</span>
                                </div>
                            )}
                            {bus.ac && (
                                <div className="flex items-center gap-2 border border-blue-500 rounded-2xl px-5 py-3 text-blue-500 text-lg">
                                    <AirVent className="w-5 h-5" />
                                    <span>Кондиционер</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 border border-blue-500 rounded-2xl px-5 py-3 text-blue-500 text-lg">
                                <span>Багаж: {bus.luggage || "50*45, 49 ед."}</span>
                            </div>
                        </div>
                        <div className="space-y-6 text-xl">
                            <div className="flex items-center gap-3">
                                <User className="w-8 h-8 text-blue-500" />
                                <span className="text-black text-2xl">Опыт водителя: {bus.driver_exp} лет</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-blue-500" />
                                <span className="text-black text-2xl">Мин. время заказа: {bus.min_time} ч</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RequestBlock />
            <FleetSlider currentBusId={bus.id} />
            <Footer />
        </>
    );
}
