import { useEffect } from "react";
import { useLocation } from "react-router";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { TrackByTrack } from "../components/TrackByTrack";
import { WhatsAppStickers } from "../components/WhatsAppStickers";
import { VideoSection } from "../components/VideoSection";
import { DiccionarioBeele } from "../components/DiccionarioBeele";
import { MerchSection } from "../components/MerchSection";
import { RegistrationForm } from "../components/RegistrationForm";
import { Footer } from "../components/Footer";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div
      className="w-full"
      style={{ fontFamily: "'Space Grotesk', sans-serif", scrollBehavior: "smooth" }}
    >
      <Navigation theme="dark" />
      <Hero />
      <TrackByTrack />
      <VideoSection />
      <WhatsAppStickers />
      <DiccionarioBeele />
      <MerchSection />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
