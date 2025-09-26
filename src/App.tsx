import "./index.css";
import Header from "./components/Header";
import BusHero from "./components/BusHero";
import Fleet from "./components/Fleet";
import Partners from "./components/Partners.tsx";
import Advantages from "./components/Advantages.tsx";
import Opportunities from "./components/Opportunities.tsx";


function App() {
    return (
        <>
            <Header />
            <main>
                <BusHero />
                <Fleet />
                <Advantages></Advantages>
                <Opportunities></Opportunities>
                <Partners></Partners>

            </main>
        </>
    );
}

export default App;
