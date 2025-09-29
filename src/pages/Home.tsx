import Header from "../components/Header";
import BusHero from "../components/BusHero";
import Fleet from "../components/Fleet";
import Advantages from "../components/Advantages";
import Opportunities from "../components/Opportunities";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <BusHero />
                <Fleet />
                <Advantages />
                <Opportunities />
                <Partners />
            </main>
            <Footer />
        </>
    );
}
