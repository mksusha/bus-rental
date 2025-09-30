import Header from "../components/Header";
import BusHero from "../components/BusHero";
import Fleet from "../components/Fleet";
import Advantages from "../components/Advantages";
import Opportunities from "../components/Opportunities";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

type HomeProps = {
    openModal: () => void;
};

export default function Home({ openModal }: HomeProps) {
    return (
        <>
            <PageTitle
                title="Аренда автобусов с водителем | Современные автобусы для экскурсий и мероприятий"
                description="Аренда комфортабельных автобусов с опытными водителями для экскурсий, корпоративов и любых мероприятий. Гибкие условия, честные цены и гарантия подачи транспорта вовремя."
            />
            <Header />
            <main>
                <BusHero openModal={openModal} />
                <Fleet />
                <Advantages />
                <Opportunities />
                <Partners />
            </main>
            <Footer />
        </>
    );
}
