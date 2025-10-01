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
                title="Аренда автобусов в Минске от 70 руб/час"
                description="Аренда автобусов с водителем в Минске — 🚌Mersedes и 🚌Setra. Комфортные автобусы с туалетом, кондиционером и раскладными креслами. Звоните ☎ +375 29 628 90 29. Экскурсии, корпоративы, туры."
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
