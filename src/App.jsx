import { useScrollytelling } from "./useScrollytelling.js";
import ChapterNav from "./components/ChapterNav.jsx";
import Tooltip from "./components/Tooltip.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import Intro from "./sections/Intro.jsx";
import Chapter1Monopoly from "./sections/Chapter1Monopoly.jsx";
import Chapter2State from "./sections/Chapter2State.jsx";
import Chapter3Sectors from "./sections/Chapter3Sectors.jsx";
import Chapter4Debate from "./sections/Chapter4Debate.jsx";
import Chapter5Final from "./sections/Chapter5Final.jsx";
import ChatMascot from "./components/ChatMascot.jsx";

export default function App() {
  useScrollytelling();

  return (
    <>
      <main className="landing">
        <div className="hero-intro-visual" data-hero-intro-visual="" aria-hidden="true"></div>

        <Hero />
        <Intro />
        <ChapterNav />
        <Chapter1Monopoly />
        <Chapter2State />
        <Chapter3Sectors />
        <Chapter4Debate />
        <Chapter5Final />

        <Footer />
      </main>

      <Tooltip />
      <ChatMascot />
    </>
  );
}
