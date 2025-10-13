import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Header from "@/components/Header";
import FirstModel from "@/components/Models/FirstModel";
import SecondModel from "@/components/Models/SecondModel";
import OurBusiness from "@/components/Geo/OurBusiness";
import PlaneModel from "@/components/Models/PlaneModel";
import PowringFuture from "@/components/Geo/PoweringFuture";
import NewsInsights from "@/components/Geo/NewsInsights";
import NotesSection from "@/components/Geo/Notes";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
   <>
    <Header />
    <Hero />
    {/* <About />
    <FirstModel />
    <SecondModel /> */}
    <OurBusiness />
    <PlaneModel />
    <PowringFuture />
    <NewsInsights />
    <NotesSection />
    <Footer />
   </>
  );
}
