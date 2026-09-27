import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustIndicators } from "@/components/landing/trust-indicators";
import { CategoriesSection } from "@/components/landing/categories-section";
import { FeaturedCourses } from "@/components/landing/featured-courses";
import { WhyAsquala } from "@/components/landing/why-asquala";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustIndicators />
        <CategoriesSection />
        <FeaturedCourses />
        <WhyAsquala />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
