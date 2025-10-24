import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Header from "@/components/Header";
import FirstModel from "@/components/Models/FirstModel";
import OurBusiness from "@/components/Geo/OurBusiness";
import PlaneModel from "@/components/Models/PlaneModel";
import PowringFuture from "@/components/Geo/PoweringFuture";
import NewsInsights from "@/components/Geo/NewsInsights";
import NotesSection from "@/components/Geo/Notes";
import Footer from "@/components/Footer/Footer";
import PageWrapper from "@/components/Loader/PageWrapper";
// import Loader from "@/components/Loader/loader";

export default function Home() {
  return (
   <PageWrapper>
    <Header />
    <Hero />
    <About />
    <FirstModel />
    <OurBusiness />
    <PlaneModel />
    <PowringFuture />
    <NewsInsights />
    <NotesSection />
    <Footer />
   </PageWrapper>
  );
}
