import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import GallerySection from '@/components/home/gallery-section';
import InstagramSection from '@/components/home/instagram-section';
import ContactSection from '@/components/home/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <GallerySection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
